//event.js
// listen  listener
// 규칙 기억하기
let students = [{
    stdNo: 100,
    stdName: '김동우',
    score: 80
}];
// 학생정보 지정. students.length

// 이벤트...
document.querySelector('button#addBtn').addEventListener('click', function () {
    // 사용자의 입력값.
    let sno = document.querySelector('#student_no').value;
    let sname = document.querySelector('#student_name').value;
    let score = document.querySelector('#score').value;

    if (sno == '' || sname == '' || score == '') {
        alert('값을 입력하세요');
        return;
    }

    students[students.length] = {
        stdNo: sno,
        stdName: sname,
        score: score
    };

    console.log(students);
    createStdList();
    //입력항목 초기화.
    document.querySelector('#student_no').value = '';
    document.querySelector('#student_name').value = '';
    document.querySelector('#score').value = '';
});
// querySelector('') 태그 중 첫번째만 가져옴
// 부모태그 parentElement  자식태그 children
// 수정이벤트.
document.querySelector('.addBtn').addEventListener('click', function () {
    //목록에서 tr 전체선택.
    // 찾을 학생번호, 변경할 학생점수
    let sno = document.querySelector('#student_no').value;
    let score = document.querySelector('#score').value;

    let nodeList = document.querySelectorAll('#list tbody tr');
    for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i].children[0].innerHTML == sno) {
            nodeList[i].children[2].innerHTML = score;
        }
    }
});



// 함수영역
// 배열값을 활용해서 학생목록 
function createStdList() {
    let str = ``;
    for (let i = 0; i < students.length; i++) {
        str += `<tr onclick='showInfo(event)'><td>${students[i].stdNo}</td>
        <td>${students[i].stdName}</td>
        <td>${students[i].score}</td>
        <td><button class='btn btn-danger' onclick='removeRow(event)'>삭제</button></td></tr>`;
    }
    // innerHTML 두 값사이
    document.querySelector('#list tbody').innerHTML = str;
} // end of createStdList().
createStdList();

console.log(document.querySelectorAll('button'));

// document.querySelectorAll('button')[0].addEventListener();

// 학생정보삭제 함수.
function removeRow(e) {
    e.target.parentElement.parentElement.remove();
}
// 학생정보 입력화면에 출력.
// console.dir(); 객체 속성 출력 e.target 이벤트가 발생한 원래의 요소 실제 클릭된 곳
function showInfo(e) {
    // 학생번호 - student_no
    document.querySelector('#student_no').value = e.target.parentElement.children[0].innerHTML;

    // 학생이름 - student_name
    document.querySelector('#student_name').value = e.target.parentElement.children[1].innerHTML;

    // 점수 - score
    document.querySelector('#score').value = e.target.parentElement.children[2].innerHTML;
}