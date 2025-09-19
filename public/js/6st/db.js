// db.js

// 추가 버튼 
document.forms['postForm'].addEventListener('submit', function(e) {
    e.preventDefault(); // 기본 기능을 차단하겠다
    let title = document.querySelector('[name = "title"]').value; // 입력값
    let author = document.querySelector('[name = "author"]').value; // 입력값
    if (!title || !author) { // title 또는 author에 값이 없다면
        alert('내용, 저자 입력해주세요');
        return;
    }
    // ajax. 요청 방식: post 
    fetch('http://localhost:3000/posts', { // 뒤에 옵션객체
        method: 'post', // method 는 요청방식을 담는 곳
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({title, author}), // body실제정보
    }) 
    .then((response) => response.json())
    .then((result) => {
        // console.log(result);
        // 추가 버튼 눌러서 바로 목록에 뜨도록 
        let title = document.querySelector("title").value;
        let author = document.querySelector("author").value;
        if (!title || !author) {
            alert('내용, 저자 입력해주세요');
        } else {
            return result();
        }



    })
    .catch(err => console.log(err));
});



// 게시글 목록
const container = document.querySelector('#data-container');
fetch('http://localhost:3000/posts') // json 문자열 데이터
.then((response) => response.json())
.then((result) => {
    // 게시글 건수만큼 row 생성.
    result.forEach((item) => {
        let div = document.createElement('div');
        for (let prop in item) { //prop 속성
            let span = document.createElement('span'); // span 생성
            span.innerHTML = item[prop]; // 배열의 첫 번째 값을 가져옴 []
            span.setAttribute('class','data-' + prop);
            div.appendChild(span);
        }
        container.appendChild(div);
    }) 
})
.catch((err) => console.log(err))

