// ====================================================================
// 1. 모듈 임포트 및 서버 설정
// ====================================================================
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const oracledb = require('oracledb');
const crypto = require('crypto');
const app = express();
const port = 3000;

// 결과 형식을 객체로 설정
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// 🔴 [순환 참조 해결 1] 모든 LOB (CLOB, NCLOB) 데이터를 문자열로 자동 변환하도록 설정
oracledb.fetchAsString = [oracledb.CLOB, oracledb.NCLOB];

// ⚠️ [필수 설정 1] Oracle DB 접속 정보
const dbConfig = {
    user: "scott",    // <<-- 실제 DB 사용자명으로 변경!
    password: "tiger",// <<-- 실제 DB 비밀번호로 변경!
    connectString: "localhost:1521/xe", 
    poolAlias: "RADIO_POOL", 
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0,
};

// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


// ====================================================================
// 2. 유틸리티 함수
// ====================================================================
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function validateStoryData(data) {
    const { story_name, story_pw, story_content } = data;
    const hasUpperCase = /[A-Z]+/.test(story_pw);
    const hasLowerCase = /[a-z]+/.test(story_pw);
    const hasSpecialChar = /[!@#$%^&*]+/.test(story_pw);

    // 최소한의 서버 유효성 검사만 남김
    if (!story_name || !story_pw || !story_content || story_pw.length < 4 || !hasUpperCase || !hasLowerCase || !hasSpecialChar) {
        return false;
    }
    return true;
}


// ====================================================================
// 3. 라우팅 (Routing)
// ====================================================================

// 3.1. POST: 사연 저장 (DB 트랜잭션)
app.post('/submit-story', async (req, res) => {
    let connection;
    const data = req.body;

    if (!validateStoryData(data)) {
        return res.status(400).send('<h1>오류: 필수 정보가 누락되었거나 서버 측 비밀번호 규칙을 위반했습니다.</h1>');
    }

    try {
        connection = await oracledb.getConnection(dbConfig.poolAlias);
        console.log('--- DB 연결 풀에서 커넥션 획득 성공 ---');

        // 1. 'story' 테이블에 데이터 INSERT 및 ID 받기
        const storySql = `
            INSERT INTO story (
                story_id, story_name, story_age, story_gender, 
                story_content, story_pw, gift_apply
            ) VALUES (
                NULL, :name, :age, :gender, 
                :content, :pw, :gift_apply
            ) RETURNING story_id INTO :id`;
        
        const storyBinds = {
            name: data.story_name,
            age: data.story_age,
            gender: data.story_gender === 'E' ? data.story_gender_other : data.story_gender,
            content: data.story_content,
            pw: hashPassword(data.story_pw),
            gift_apply: data.gift_apply === 'Y' ? 'Y' : 'N',
            id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
        };

        const storyResult = await connection.execute(storySql, storyBinds, { autoCommit: false });
        const newStoryId = storyResult.outBinds.id[0];
        console.log(`New Story ID generated: ${newStoryId}`);


        // 2. 경품 응모 시 'gift_applicant' 테이블에 INSERT
        if (data.gift_apply === 'Y') {
            const applicantSql = `
                INSERT INTO gift_applicant (
                    story_id, applicant_name, applicant_email, applicant_postal, 
                    applicant_phone, address_detail, privacy_agree
                ) VALUES (
                    :story_id, :app_name, :app_email, :app_postal, 
                    :app_phone, :addr_detail, :privacy_agree
                )`;
            
            const applicantBinds = {
                story_id: newStoryId,
                app_name: data.applicant_name || null,
                app_email: data.applicant_email || null,
                app_postal: data.applicant_postal || null,
                app_phone: data.applicant_phone || null,
                addr_detail: data.address_detail || null,
                privacy_agree: data.privacy_agree === 'Y' ? 'Y' : 'N',
            };
            
            await connection.execute(applicantSql, applicantBinds, { autoCommit: false });
            console.log('Gift Applicant data inserted.');
        }

        // 3. 최종 커밋
        await connection.commit();
        
        res.sendFile(path.join(__dirname, '..', 'public', 'success.html'));
       
    } catch (err) {
        if (connection) {
            try {
                await connection.rollback(); 
            } catch (err2) {
                console.error("Rollback error:", err2);
            }
        }
        
        console.error("🚨 서버 오류 (DB/SQL):", err.message);
        res.status(500).send(`<h1>서버 오류: 사연 저장에 실패했습니다. (DB Rollback 완료)</h1><p>CMD 창에 출력된 오류 메시지를 확인하세요.</p><p>오류 유형: ${err.message.substring(0, 50)}...</p>`);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Connection close error:", err);
            }
        }
    }
});


// 3.2. GET: HTML 파일 서빙
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/story_modify.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'modify.html'));
});

// 3.3. GET: 사연 조회 (데이터만 JSON으로 응답)
app.get('/get-story', async (req, res) => {
    let connection;
    const { lookup_name, lookup_pw } = req.query; 

    if (!lookup_name || !lookup_pw) {
        return res.status(400).json({ error: "조회에 필요한 이름과 비밀번호가 누락되었습니다." });
    }

    try {
        connection = await oracledb.getConnection(dbConfig.poolAlias);
        
        const hashedPw = hashPassword(lookup_pw); 

        const sql = `
            SELECT 
                s.*, 
                g.applicant_name, g.applicant_email, g.applicant_postal, 
                g.applicant_phone, g.address_detail, g.privacy_agree
            FROM story s
            LEFT JOIN gift_applicant g ON s.story_id = g.story_id
            WHERE s.story_name = :name AND s.story_pw = :pw`;

        const result = await connection.execute(sql, { name: lookup_name, pw: hashedPw });

        if (result.rows.length === 0) {
            console.log(`🔎 조회 실패: ${lookup_name}에 일치하는 사연 없음`);
            return res.status(404).json({ error: "일치하는 사연을 찾을 수 없습니다. 이름과 비밀번호를 확인해 주세요." });
        }
        
        // 🔴 [순환 참조 해결 2] JSON.parse(JSON.stringify())를 사용하여 
        // LOB/메타데이터를 포함한 모든 순환 참조를 강제로 제거하고 순수 데이터 객체를 생성합니다.
        const storyData = JSON.parse(JSON.stringify(result.rows[0]));

        console.log(`✅ 조회 성공: ${lookup_name} 사연 데이터 전송`);
        res.status(200).json(storyData); 

    } catch (err) {
        console.error("🚨🚨🚨 사연 조회 중 치명적인 오류 발생 (DB/SQL):", err.message);
        return res.status(500).json({ error: "데이터 조회 중 서버 오류가 발생했습니다. CMD 로그를 확인하세요.", detail: err.message });
    } finally {
        if (connection) {
             try {
                await connection.close();
            } catch (err) {
                console.error("Connection close error in get-story:", err);
            }
        }
    }
});


// ====================================================================
// 3.4. GET: 관리자 페이지 HTML 파일 서빙 (list.html 사용)
// ====================================================================
app.get('/admin/stories', (req, res) => {
    // public 폴더 내의 list.html 파일을 응답합니다.
    res.sendFile(path.join(__dirname, '..', 'public', 'list.html'));
});


// ====================================================================
// 3.5. GET: 관리자 API (전체 사연 데이터 JSON 응답)
// ====================================================================
app.get('/api/admin/stories', async (req, res) => {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig.poolAlias);

        // 🟢 [SQL 쿼리] 사연 목록에 필요한 핵심 정보를 조회
        const sql = `
            SELECT 
                s.story_id, s.story_name, s.story_age, s.story_gender, 
                s.story_content, s.gift_apply,
                g.applicant_name, g.applicant_email
            FROM story s
            LEFT JOIN gift_applicant g ON s.story_id = g.story_id
            ORDER BY s.story_id DESC`; // 최신 사연을 먼저 보여줍니다.

        const result = await connection.execute(sql);
        
        // 🔴 순환 참조 방지 및 데이터 추출
        const stories = JSON.parse(JSON.stringify(result.rows)); 

        // JSON 데이터만 클라이언트(list.js)로 전송
        res.status(200).json(stories);

    } catch (err) {
        console.error("🚨🚨🚨 관리자 API 데이터 로드 오류 (DB/SQL):", err.message);
        res.status(500).json({ error: "데이터베이스 오류로 사연 목록을 가져올 수 없습니다." });
    } finally {
        if (connection) {
             try {
                await connection.close();
            } catch (err) {
                console.error("Connection close error in admin api:", err);
            }
        }
    }
});


// ====================================================================
// 3.6. GET: 관리자 상세 페이지 (개인 정보 포함)
// ====================================================================
app.get('/admin/story/:id', async (req, res) => {
    let connection;
    // URL에서 사연 ID를 추출합니다.
    const storyId = req.params.id; 

    try {
        connection = await oracledb.getConnection(dbConfig.poolAlias);

        // 🟢 [SQL 쿼리] 해당 ID의 사연과 경품 응모자의 모든 개인 정보를 조회
        const sql = `
            SELECT 
                s.story_id, s.story_name, s.story_age, s.story_gender, 
                s.story_content, s.gift_apply,
                g.applicant_name, g.applicant_email, g.applicant_postal, 
                g.applicant_phone, g.address_detail, g.privacy_agree
            FROM story s
            LEFT JOIN gift_applicant g ON s.story_id = g.story_id
            WHERE s.story_id = :id`;

        const result = await connection.execute(sql, { id: storyId });

        if (result.rows.length === 0) {
            return res.status(404).send('<h1>오류: 해당 사연 ID를 찾을 수 없습니다.</h1>');
        }

        // 🔴 순환 참조 방지 및 데이터 추출
        const storyDetail = JSON.parse(JSON.stringify(result.rows[0]));

        // 상세 정보 HTML 생성
        const html = generateDetailHtml(storyDetail);

        res.status(200).send(html);

    } catch (err) {
        console.error("🚨🚨🚨 상세 페이지 로드 오류 (DB/SQL):", err.message);
        res.status(500).send(`
            <h1>상세 페이지 로드 실패</h1>
            <p>데이터베이스 오류가 발생했습니다. 로그를 확인하세요.</p>
            <p>오류: ${err.message}</p>
        `);
    } finally {
        if (connection) {
             try {
                await connection.close();
            } catch (err) {
                console.error("Connection close error in detail:", err);
            }
        }
    }
});


// ====================================================================
// 3.7. 상세 정보 HTML 생성 함수 (서버 렌더링 유지)
// ====================================================================

function generateDetailHtml(data) {
    const isGiftApplicant = data.GIFT_APPLY === 'Y';
    
    return `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <title>관리자 - 사연 상세 정보</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: auto; }
                h1 { color: #333; border-bottom: 2px solid #ddd; padding-bottom: 10px; }
                h2 { color: #555; margin-top: 30px; }
                .info-box { border: 1px solid #eee; padding: 15px; margin-bottom: 15px; background-color: #f9f9f9; border-radius: 5px; }
                .info-box p { margin: 5px 0; font-size: 16px; }
                .info-box span { font-weight: bold; display: inline-block; width: 150px; color: #007bff; }
                .story-content { background-color: #fff; padding: 15px; border: 1px solid #ddd; white-space: pre-wrap; margin-top: 10px; }
                .private-data { border-left: 5px solid ${isGiftApplicant ? '#28a745' : '#dc3545'}; padding-left: 10px; }
                .back-button { display: inline-block; padding: 10px 15px; background-color: #6c757d; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            </style>
        </head>
        <body>
            <h1>📻 사연 상세 정보 (ID: ${data.STORY_ID})</h1>

            <h2>📝 사연 기본 정보</h2>
            <div class="info-box">
                <p><span>이름:</span> ${data.STORY_NAME}</p>
                <p><span>나이:</span> ${data.STORY_AGE || '-'}</p>
                <p><span>성별:</span> ${data.STORY_GENDER || '-'}</p>
                <p><span>경품 응모 여부:</span> ${data.GIFT_APPLY === 'Y' ? '✅ 예' : '❌ 아니오'}</p>
            </div>

            <h2>📜 사연 내용</h2>
            <div class="story-content">${data.STORY_CONTENT || '내용 없음'}</div>

            <h2>📞 경품 응모자 개인 정보</h2>
            ${isGiftApplicant ? `
                <div class="info-box private-data">
                    <p><span>신청자 이름:</span> ${data.APPLICANT_NAME}</p>
                    <p><span>휴대폰 번호:</span> <span style="color: #dc3545;">${data.APPLICANT_PHONE || '정보 없음'}</span></p>
                    <p><span>이메일:</span> ${data.APPLICANT_EMAIL || '정보 없음'}</p>
                    <p><span>우편번호:</span> <span style="color: #dc3545;">${data.APPLICANT_POSTAL || '정보 없음'}</span></p>
                    <p><span>상세 주소:</span> ${data.ADDRESS_DETAIL || '정보 없음'}</p>
                    <p><span>개인 정보 동의:</span> ${data.PRIVACY_AGREE === 'Y' ? '✅ 동의' : '❌ 비동의'}</p>
                </div>
            ` : `
                <div class="info-box">
                    <p style="color: #dc3545;">경품 응모를 하지 않아 개인 정보가 저장되어 있지 않습니다.</p>
                </div>
            `}

            <a href="/admin/stories" class="back-button">← 목록으로 돌아가기</a>
        </body>
        </html>
    `;
}

// 정적 파일 제공
app.use(express.static(path.join(__dirname, '..', 'public')));


// ====================================================================
// 4. 서버 시작 전 초기화 (Connection Pooling)
// ====================================================================

// DB 연결 풀 초기화 함수
async function initialize() {
    try {
        await oracledb.createPool(dbConfig);
        console.log("✅ Oracle DB 연결 풀 초기화 성공!");
    } catch (err) {
        console.error("❌ Oracle DB 연결 풀 초기화 실패:", err.message);
        process.exit(1);
    }
}

// 서버 시작 함수
async function startServer() {
    await initialize(); 
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
        console.log(`-----------------------------------------------`);
    });
}

startServer();