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
        title: document.querySelector('input[name="title"]').value,
        author: document.querySelector('input[name="author"]').value

    }));
    xhtp.onload = function () {
        let result = JSON.parse(xhtp.responseText);
        let div = makeRow(result);

        document.querySelector('#data-container').appendChild(div);
        document.querySelector('input[name="title"]').value = ' ';
        document.querySelector('input[name="author"]').value = ' ';
    }
}
// addPost();

const xhtp = new XMLHttpRequest();
xhtp.open('get', 'http://localhost:3000/posts');
xhtp.send();
xhtp.onload = function () {
    let data = JSON.parse(xhtp.responseText);
    let fields = ['id', 'title', 'author'];
    data.forEach(function (item, idx, ary) {
        let div = document.createElement('div');
        div = makeRow(item);
        document.querySelector('#data-container').appendChild(div);
    })
}

function makeRow(post) {
    let fields = ['id', 'title', 'author'];
    let div = document.createElement('div');
    for (let i = 0; i < fields.length; i++) {
        let span = document.createElement('span');
        span.innerHTML = post[fields[i]];
        div.appendChild(span);
    }
    return div;
}


//JSON.stringify 객체를 자바스크립트로