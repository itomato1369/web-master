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
        // 초기화
        document.querySelector('input[name="title"]').value 
        document.querySelector('input[name="author"]').value
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
    });
};

function makeRow(post) {
    let fields = ['id', 'title', 'author'];
    let div = document.createElement('div');
    //div에 클릭이벤트
    div.addEventListener('click', function () {
        const target = this; // this에 바인딩 되는 값을 확인  현재 this는 div
        const post_id = this.childern[0].innerHTML; // this를 확인 후 postId 값을 계산
        // 댓글 목록 만들기
        const cList = document.querySelector('.comments'); // <div class='comments'> 찾기
        cList.innerHTML = ''; // cList 안에 있는 html 값을 초기화하기
        // 전체 댓글 목록에서 post 에 해당하는 댓글을 filtering 하기
        const filterList = comments.filter((item) => item.postId == post_id);
        // 댓글목록을 반복하면서 <span>댓글번호</span> <span>댓글내용</span> 만들기
        filterList.forEach((item) => {
            let div = document.createElement('div');
            let span = document.createElement('span'); // 댓글 id
            span.innerHTML = item.id;
            div.appendChild(span);
            span = document.createElement('span');
            span.innerHTML = item.content;
            div.appendChild(span);
            // div 와 span의 부모자식관계 만들기
            cList.appendChild(div);
        });
        target.appendChild(cList);
    }); // div 의 클릭 이벤트 끝

    for (let i = 0; i < fields.length; i++) {
        let span = document.createElement('span');
        span.classList.add(`data:${fields[i]}`);
        span.innerHTML = post[fields[i]];
        span.setAttribute('class', 'data-' + fields[i]);
        div.appendChild(span);
    }
    return div;
}

//JSON.stringify 객체를 자바스크립트로