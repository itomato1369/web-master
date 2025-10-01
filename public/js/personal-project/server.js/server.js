// server
const express = require("express");
const oracledb = require("oracledb");
const path = require("path"); 
const bodyParser = require("body-parser"); 
// 일단 이렇게 실행하고 안되면
// const express = require("express");
// const oracledb = require("oracledb");
// const cors = require("cors");

// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors()); // CORS 허용 설정 


// 1. 결과 형식을 객체로 설정 (사용권장)
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// express 어플리케이션 생성
const app = express(); 
const port = 3000;

// 2. Oracle DataBase 연결 정보
// "localhost:1521/xe" 오라클의 고유 번호
const dbconfig = {
    user: "scott",
    password: "tiger",
    connectString: "localhost:1521/xe",
    poolMin: 10,
    poolMax: 10,
    PoolIncrement: 0,
    poolAlias: "SERVER_POOL",
};

// 3. Oracle DateBase 연결 풀 초기화 함수
// async: 이 함수 안에는 시간이 오래 걸리는 작업(await)이 있다
// 그 작업이 끝날 때까지 기다렸다가 다음 코드를 실행하겠다는 의미
// try: 일단 이 안의 코드를 실행해 보세요. 에러가 나면 catch로 넘어갑니다.
async function initialize() {
    try {
        await oracledb.createPool(dbConfig);
        console.log("연결 성공");
    } catch (err) {
        console.log("에러가 발생하였습니다", err);
        process.exit(1); // 연결 실패 시 서버종료
    }
}
// initialize() 는 나중에 

// 4. 서버 라우팅 (API) 정의
// 루트경로 '/' 요청시 index.html 파일 전송
app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
});

// 5. 사연 제출 API
app.post('/api/story/submit', async (req,res) => {
    let connection;
    try {
        const data = req.body;
        console.log('클라이언트로 부터 수신된 사연', data);
        // story TABLE INSERT
        const storySql = `INSERT INTO story
        (story_name, story_age, story_gender, story_content, story_pw, gift_apply)
        VALUES (:name, :age, :gender, :content, :pw, :apply)
        RETURNING story_id INTO :story_id`;

        const storyBinds = {
            name: data.story_name,
            age: data.story_age,
            gender: data.story_gender,
            content: data.story_content,
            pw: data.story_pw,
            apply: data.gift_apply === '네' ? 'Y' : 'N',
            story_id: {type: oracledb.NUMBER, dir: oracledb.BIND_OUT}
        };
        // DataBase 연결 획득
        connection = await oracledb.getConnection();
        
        // 트랝개션 시작 (자동 커밋 비활성화)
        const storyResult = await connection.execute(storySql, storyBinds, {autoCommit: false});
        // 새 story_id 획득
        const newStoryId = storyResult.outBinds.story_id[0];
        
        // 경품 응모 정보 gift_applicant TABLE INSERT
        if (data.gift_apply === '네' {
            const applicnatSql = `INSERT INTO gift_applicant (
            story_id, applicant_name, applicant_email, applicant_postal, applicant_phone, address_detail, privacy_agree
            VALUES( ))`
        })

    }
})