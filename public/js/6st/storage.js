// storage.js
// console.log(window); // == console.log(this);
// localStorage.setItem('myName','킴동우');
// localStorage.setItem('myInfo', '{"name":"KIM", "age": 1}');
// let info = JSON.parse(localStorage.getItem('myInfo')); // getItem = 값을 가져옴
// console.log(info);  // 문자열을 자바스크립트의 객체로
// JSON.parse JSON문자열을 객체나 값으로  JSON.stringify JSON 객체나 값을 문자열로

// localStorage: boardList 
// [{boardNum:1,
// title:'연습글입니다.',
// content: '연습~~~~~~~~~~~',
// writer: user01}...}] 

// 이 내용을 저장하고 싶다면 {}객체로 저장 문자일 경우 '' "" 둘 중 하나
// 여러개 담아야 하면 [] 배열
// 제목은 문자열로 담아야함


// for(let prop in item) 
// item 이라는 객체의 모든 열거 가능한 prop(속성)을 순회하는 반복문

// localStorage.setItem('boardList'//저장 하고 싶은 이름 
// ,JSON.stringify([{}]));
// console.log(window);

let list = [{
    sno: 100,
    sname: "kdb",
    score: 90
}, {
    sno: 200,
    sname: 'kgb',
    score: 78
}, {
    sno: 300,
    sname: 'kim',
    score: 50
}]
// localStorage.setItem('students', JSON.stringify(list));



function loadData() {
    document.querySelector('#data-container').innerHTML = ' ';
    let data = JSON.parse(localStorage.getItem('students')); //JSON.parse  JSON문자열을 객체나 값으로
    data.forEach((item) => {
        let div = document.createElement('div');
        for (let prop in item) {
            let span = document.createElement('span');
            span.innerHTML = item[prop];
            span.setAttribute('class', 'data-' + prop);  // `data -${prop}` 이것도 됨 
            div.appendChild(span);
        }
        // 수정화면으로 이동하는 버튼
        let btn = document.createElement('button'); // 요소 만들 때는 document.createElement
        btn.innerHTML = '수정';
        btn.addEventListener('click', function(e) {
            // serach: sno 저장
            localStorage.setItem('search', item.sno);
            location.href = 'update.html';
        });
        div.appendChild(btn); // 화면에 보여주기 위함
        document.querySelector('#data-container').appendChild(div);
    });
}
loadData(); // 목록출력

// let data = JSON.parse(localStorage.getItem('students')); //JSON.parse  JSON문자열을 객체나 값으로
// data.forEach((item) => {
//     let div = document.createElement('div');
//     for(let prop in item) {
//         let span = document.createElement('span');
//         span.innerHTML = item[prop];
//         span.setAttribute('class','data-' + prop);
//         div.appendChild(span);
//     }
//     document.querySelector('#data-container').appendChild(div);
// });


// getItem 을 javascript로 바꾼 다음 data에 push
// 현재값을 불러오기   //addEventListener function(e)
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    // document.getElementById id 값으로 바로 가져오겠따
    let sno = document.getElementById("sno").value;
    let sname = document.getElementById("sname").value;
    let score = document.getElementById("score").value;
    // 입력값 확인
    if (!sno || !sname || !score) {
        alert('값을 입력해주세요!');
        return; // 이게 있어야 다시 돌아감
    }
    if (!confirm('저장하겠습니까?')) {
        alert('저장을 취고했습니다');
        return;
    }
    let data = JSON.parse(localStorage.getItem('students'));
    data.push({
        sno,
        sname,
        score
    });
    // storage에 저장
    localStorage.setItem('students', JSON.stringify(data));
    loadData();
});
