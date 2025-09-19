// fetch.js  서버의 데이터를 가져옴
fetch('http://localhost:3000/points') // Promise 객체반환
    .then(function (response) { // 성공하면 then 실행
        console.log(response);
        return response.json(); // 자바스크립트의 객체변경 javascript
    })
    .then(function(result) {
        console.log(result);
    })
    .catch(function (err) { // 실패할 경우 catch 실행
        console.log(err);
    });