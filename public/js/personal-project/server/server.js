// 1. 모듈 임포트 및 서버 설정
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
    user: "scott", // 실제 DB 사용자명
    password: "tiger", //  실제 DB 비밀번호
    connectString: "localhost:1521/xe", // Oracle 서버
    poolAlias: "RADIO_POOL",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0,
};

// 미들웨어 설정
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

// ====================================================================
// 2. 유틸리티 함수
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function validateStoryData(data) {
    const {
        story_name,
        story_pw,
        story_content
    } = data;
    const hasUpperCase = /[A-Z]+/.test(story_pw);
    const hasLowerCase = /[a-z]+/.test(story_pw);
    const hasSpecialChar = /[!@#$%^&*]+/.test(story_pw);

    // 최소한의 서버 유효성 검사만 남김
    if (!story_name || !story_pw || !story_content || story_pw.length < 4 || !hasUpperCase || !hasLowerCase || !hasSpecialChar) {
        return false;
    }
    return true;
}

/**
 * 성별 필드 정리 함수: '기타' 선택 시 story_gender_other의 값을 최종 성별 값으로 사용 (원본 HTML 구조 반영)
 * @param {object} data - 요청 본문 데이터
 * @returns {string} - 최종 성별 값
 */
function resolveGender(data) {
    if (data.story_gender === '기타') {
        return data.story_gender_other || '기타(미입력)';
    }
    return data.story_gender;
}

// ====================================================================
// 3. 라우팅 (Routing)
// 3.1. POST: 사연 저장 (DB 트랜잭션)
app.post('/submit-story', async (req, res) => {
    let connection;
    const data = req.body;

    // 💡 HTML이 원본으로 돌아가면서 성별 데이터를 body에서 직접 받게 됩니다.
    // POST 요청 시에는 req.body에 데이터가 들어옵니다. (bodyParser.urlencoded 미들웨어 덕분)
    if (!validateStoryData(data)) {
        return res.status(400).send('<h1>오류: 필수 정보가 누락되었거나 서버 측 비밀번호 규칙을 위반했습니다.</h1>');
    }

    // 💡 성별 값 정리 (원본 HTML 구조 반영)
    const finalGender = resolveGender(data);

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
            gender: finalGender,
            content: data.story_content,
            pw: hashPassword(data.story_pw),
            gift_apply: data.gift_apply === 'Y' ? 'Y' : 'N',
            id: {
                type: oracledb.NUMBER,
                dir: oracledb.BIND_OUT
            }
        };

        const storyResult = await connection.execute(storySql, storyBinds, {
            autoCommit: false
        });
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

            await connection.execute(applicantSql, applicantBinds, {
                autoCommit: false
            });
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

// 💡 /story_modify.html은 이제 인증/조회를 위한 API로 동작하지 않습니다. (원본처럼 단순히 HTML 파일 서빙)
app.get('/story_modify.html', (req, res) => {
    // index.html이 원본처럼 GET 방식으로 조회 요청을 보냅니다.
    // 조회에 필요한 lookup_name, lookup_pw를 query string으로 받아 modify.html에 그대로 전달합니다.
    const query = req.query;
    const url = `/story_modify.html?lookup_name=${encodeURIComponent(query.lookup_name || '')}&lookup_pw=${encodeURIComponent(query.lookup_pw || '')}`;

    // modify.html 파일 자체를 응답하되, URL에 쿼리스트링을 유지합니다.
    res.sendFile(path.join(__dirname, '..', 'public', 'modify.html'));
});


// 3.3. GET: 사연 조회 (이름/비밀번호로 조회 후 데이터 포함한 JSON 응답) - modify.html의 JS에서 호출
app.get('/get-story', async (req, res) => {
    let connection;
    // .trim() 유지 (보안 및 정확한 조회를 위해 공백 제거)
    const lookup_name = req.query.lookup_name ? req.query.lookup_name.trim() : null;
    const lookup_pw = req.query.lookup_pw ? req.query.lookup_pw.trim() : null;

    if (!lookup_name || !lookup_pw) {
        // modify.html의 JS에서 이 API를 호출하므로 JSON으로 응답
        return res.status(400).json({
            error: "조회에 필요한 이름과 비밀번호가 누락되었습니다."
        });
    }

    try {
        connection = await oracledb.getConnection(dbConfig.poolAlias);

        const hashedPw = hashPassword(lookup_pw);

        const sql = `
            SELECT 
                s.story_id, s.story_name, s.story_age, s.story_gender, 
                s.story_content, s.gift_apply,
                g.applicant_name, g.applicant_email, g.applicant_postal, 
                g.applicant_phone, g.address_detail, g.privacy_agree
            FROM story s
            LEFT JOIN gift_applicant g ON s.story_id = g.story_id
            WHERE s.story_name = :name AND s.story_pw = :pw`;

        const result = await connection.execute(sql, {
            name: lookup_name,
            pw: hashedPw
        });

        if (result.rows.length === 0) {
            console.log(`🔎 조회 실패: ${lookup_name}에 일치하는 사연 없음`);
            return res.status(404).json({
                error: "일치하는 사연을 찾을 수 없습니다. 이름과 비밀번호를 확인해 주세요."
            });
        }

        const storyData = JSON.parse(JSON.stringify(result.rows[0]));

        console.log(`✅ 조회 성공: ${lookup_name} 사연 데이터 전송 (ID: ${storyData.STORY_ID})`);
        res.status(200).json(storyData);

    } catch (err) {
        console.error("🚨🚨🚨 사연 조회 중 치명적인 오류 발생 (DB/SQL):", err.message);
        return res.status(500).json({
            error: "데이터 조회 중 서버 오류가 발생했습니다. CMD 로그를 확인하세요.",
            detail: err.message
        });
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


// 3.4. POST: 사연 수정 (DB UPDATE 처리) =
app.post('/update-story', async (req, res) => {
    let connection;
    // 💡 req.body로 JSON 데이터가 들어옵니다. (modify.html의 JS 비동기 제출 로직 때문)
    const data = req.body;
    const {
        story_id,
        story_name,
        story_content,
        story_pw,
        gift_apply,
        lookup_pw,
    } = data;

    if (!story_id || !story_name || !story_content || !lookup_pw) {
        return res.status(400).json({
            error: "필수 정보가 누락되었습니다. (ID, 이름, 내용)"
        });
    }

    // 💡 성별 값 정리 (원본 HTML 구조 반영)
    const finalGender = resolveGender(data);

    try {
        connection = await oracledb.getConnection(dbConfig.poolAlias);

        let storyBinds = {
            id: story_id,
            name: story_name,
            age: data.story_age,
            gender: finalGender,
            content: story_content,
            gift_apply: gift_apply === 'Y' ? 'Y' : 'N'
        };

        // 1. STORY 테이블 업데이트 SQL
        let storySql = `
            UPDATE story SET 
                story_name = :name, 
                story_age = :age, 
                story_gender = :gender, 
                story_content = :content, 
                gift_apply = :gift_apply`;

        if (story_pw) {
            storySql += `, story_pw = :new_pw`;
            storyBinds.new_pw = hashPassword(story_pw);
        }

        storySql += ` WHERE story_id = :id`;

        const storyResult = await connection.execute(storySql, storyBinds, {
            autoCommit: false
        });

        if (storyResult.rowsAffected === 0) {
            await connection.rollback();
            return res.status(404).json({
                error: "해당 사연 ID를 찾을 수 없거나 수정할 내용이 없습니다."
            });
        }


        // 2. GIFT_APPLICANT 테이블 처리 (경품 응모 여부에 따라 INSERT/DELETE)
        await connection.execute(`DELETE FROM gift_applicant WHERE story_id = :id`, {
            id: story_id
        }, {
            autoCommit: false
        });

        if (gift_apply === 'Y') {
            const applicantSql = `
                INSERT INTO gift_applicant (
                    story_id, applicant_name, applicant_email, applicant_postal, 
                    applicant_phone, address_detail, privacy_agree
                ) VALUES (
                    :story_id, :app_name, :app_email, :app_postal, 
                    :app_phone, :addr_detail, :privacy_agree
                )`;

            const applicantBinds = {
                story_id: story_id,
                app_name: data.applicant_name || null,
                app_email: data.applicant_email || null,
                app_postal: data.applicant_postal || null,
                app_phone: data.applicant_phone || null,
                addr_detail: data.address_detail || null,
                privacy_agree: data.privacy_agree === 'Y' ? 'Y' : 'N',
            };

            await connection.execute(applicantSql, applicantBinds, {
                autoCommit: false
            });
        }

        // 3. 최종 커밋
        await connection.commit();

        console.log(`✅ 사연 수정 완료 (ID: ${story_id})`);
        res.status(200).json({
            message: "사연이 성공적으로 수정되었습니다."
        });

    } catch (err) {
        if (connection) {
            try {
                await connection.rollback();
            } catch (err2) {
                console.error("Rollback error:", err2);
            }
        }

        console.error("🚨 서버 오류 (DB/SQL) - 수정 실패:", err.message);
        res.status(500).json({
            error: "서버 오류로 사연 수정에 실패했습니다."
        });
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


// 3.5. GET: 관리자 페이지 HTML 파일 서빙 (list.html 사용) - 유지
app.get('/admin/stories', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'list.html'));
});


// 관리자가 전체 목록을 보는 페이지 
// 모든 사연 목록을 검색하여 반환하는 API 라우트
app.get('/api/admin/stories', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection('RADIO_POOL');

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const searchName = req.query.name || '';

        const offset = (page - 1) * limit;

        // 1. WHERE 절 및 바인딩 변수 준비
        let whereClause = '';
        const searchBindParams = {};

        if (searchName) {
            // STORY 테이블 (별칭 s)의 STORY_NAME 컬럼 기준으로 검색
            whereClause = `WHERE s.STORY_NAME LIKE :searchName`;
            searchBindParams.searchName = `%${searchName}%`;
        }

        //  2. 기본 쿼리 구조 (STORY 테이블과 GIFT_APPLICANT 테이블을 JOIN)
        const baseFromClause = `
            FROM STORY s
            LEFT JOIN GIFT_APPLICANT ga ON s.STORY_ID = ga.STORY_ID
        `;

        // 3. 총 데이터 수 쿼리 (WHERE 절 포함)
        const countQuery = `
            SELECT COUNT(*) AS TOTAL_COUNT 
            ${baseFromClause}
            ${whereClause} 
        `;

        // 총 개수 쿼리 실행
        const countResult = await connection.execute(countQuery, searchBindParams);
        const totalCount = countResult.rows[0].TOTAL_COUNT;

        // 4. 특정 페이지 데이터 쿼리 (SELECT 컬럼 지정 및 WHERE 절, 페이징 포함)
        const dataQuery = `
            SELECT 
                s.STORY_ID, s.STORY_NAME, s.STORY_AGE, s.STORY_GENDER, 
                s.STORY_CONTENT, s.GIFT_APPLY, 
                ga.APPLICANT_NAME, ga.APPLICANT_EMAIL 
            ${baseFromClause}
            ${whereClause} 
            ORDER BY 
                s.STORY_ID DESC
            OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY
        `;

        // 데이터 쿼리 실행 시, 검색어 바인딩 변수와 페이징 변수를 통합
        const dataBindParams = {
            ...searchBindParams,
            offset: offset,
            limit: limit
        };

        const dataResult = await connection.execute(
            dataQuery,
            dataBindParams, {
                fetchInfo: {
                    "STORY_CONTENT": {
                        type: oracledb.STRING
                    }
                }
            }
        );

        res.json({
            totalCount: totalCount,
            stories: dataResult.rows
        });

    } catch (err) {
        console.error("🚨 사연 목록 조회 중 최종 오류 발생 (테이블/조인 오류 해결 시도):", err);
        res.status(500).json({
            error: "데이터 로드 실패: DB 구조를 반영하여 수정되었습니다. 서버 로그를 확인하세요.",
            detail: err.message
        });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("DB 연결 종료 실패:", err);
            }
        }
    }
});


// 3.7. GET: 방식으로  (개인 정보 포함) 
app.get('/admin/story/:id', async (req, res) => {
    let connection;
    const storyId = req.params.id;

    try {
        connection = await oracledb.getConnection(dbConfig.poolAlias);

        const sql = `
            SELECT 
                s.story_id, s.story_name, s.story_age, s.story_gender, 
                s.story_content, s.gift_apply,
                g.applicant_name, g.applicant_email, g.applicant_postal, 
                g.applicant_phone, g.address_detail, g.privacy_agree
            FROM story s
            LEFT JOIN gift_applicant g ON s.story_id = g.story_id
            WHERE s.story_id = :id`;

        const result = await connection.execute(sql, {
            id: storyId
        });

        if (result.rows.length === 0) {
            return res.status(404).send('<h1>오류: 해당 사연 ID를 찾을 수 없습니다.</h1>');
        }

        const storyDetail = JSON.parse(JSON.stringify(result.rows[0]));
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


// 3.8. 관리자가 보는 목록에서 상세보기 버튼을 눌렀을 때 나오는 HTML 페이지
// server.js에 HTML을 만든 이유는 서버 렌더링 (Server-Side Rendering, SSR) 방식이기 때문
// 그리고 데이터 접근 및 보안문제
//  생성 함수 (서버 렌더링 유지)
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
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
        </head>
        <body>
            <h1><i class="fa-solid fa-list"></i> 사연 상세 정보 (story_id: ${data.STORY_ID})</h1>

            <h2>사연 기본 정보</h2>
            <div class="info-box">
                <p><span>이름/닉네임:</span> ${data.STORY_NAME}</p>
                <p><span>나이:</span> ${data.STORY_AGE || '-'}</p>
                <p><span>성별:</span> ${data.STORY_GENDER || '-'}</p>
                <p><span>경품 응모 여부:</span> ${data.GIFT_APPLY === 'Y' ? '✅ 예' : '❌ 아니오'}</p>
            </div>

            <h2><i class="fa-solid fa-file-lines"></i>  사연 내용</h2>
            <div class="story-content">${data.STORY_CONTENT || '내용 없음'}</div>

            <h2><i class="fa-solid fa-user-lock"></i> 경품 응모자 개인 정보</h2>
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
                    <p style="color: #dc3545;">경품 응모를 하지 않은 사람입니다.</p>
                </div>
            `}

            <a href="/admin/stories" class="back-button"><i class="fa-solid fa-arrow-left"></i> 목록으로 돌아가기</a>
        </body>
        </html>
    `;
}

// 정적 파일 제공
app.use(express.static(path.join(__dirname, '..', 'public')));

// 4. 서버 시작 전 초기화 (Connection Pooling)
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
    http: //192.168.0.55:3000
        app.listen(port, () => {
            console.log(`Server is running at http://192.168.0.55:3000`);
            console.log(`-----------------------------------------------`);
        });
}

startServer();