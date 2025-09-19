// ajax.js
// 비동기방식 vs 동기방식
// Asynchronous Javascript And XML(Json)
// 

// function backup () {
    let members = [];

    const xhtp = new XMLHttpRequest();
    xhtp.open('get', '../4st/data.json');
    xhtp.send();
    xhtp.onload = function () {
        members = JSON.parse(xhtp.responseText);
        console.log(members);
    };

// }

// setTimeout(function () {
//     console.log('첫번째 함수');
// }, 1000);
// setTimeout(function () {
//     console.log('두번째 함수');
// }, 2000);
// setTimeout(function () {
//     console.log('세번째 함수');
// }, 3000);

