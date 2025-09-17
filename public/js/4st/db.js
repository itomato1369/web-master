// db.js

// event. 약어 e
document.querySelector('div.container>form')
    .addEventListener('submit', function (e) {
        e.preventDefault(); // 기본 기능 차단.
        addPost();
    });

function addPost() {
    const xhtp = new XMLHttpRequest();
    xhtp.open('post', 'http://localhost:3000/posts');
    // post 요청일 때 요청헤더: content 형식 지정.
    xhtp.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhtp.send(JSON.stringify({
        title: title,
        author: author
    }));
    xhtp.onload = function () {
        let result = JSON.parse(xhtp.responseText);
        console.log(result);
        //
    }
}
// addPost();

//JSON.stringify 객체를 자바스크립트로

const xhtp = new XMLHttpRequest();
xhtp.open('get', 'http://localhost:3000/posts'); // 서버의 요청할 페이지 지정.
// xhtp.send(); // 실제 요청
xhtp.onload = function () {
    let data = JSON.parse(xhtp.responseText); //콘솔확인 해보기
    console.log(data);
    let fields = ['id', 'first_name', 'last_name', 'gender', 'salary']
    data.forEach(function (item, idx, ary) {
        let div = document.createElement('div');
        for (let i = 0; i < fields.length; i++) {
            let span = document.createElement('span');
            span.classList.add(`data-${fields[i]}`);

            span.innerHTML = item[fields[i]];
            div.appendChild(span);
        }
        document.querySelector('#list').appendChild(span);
    });
}