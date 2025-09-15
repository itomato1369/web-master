// inch * 2.54 연산식은 식 (expression)
// "공부해야돼" 문자열도 식
// 530  숫자도 식
// 문(statement)는 명령 명령의 끝은;
// 변수를 지정 let 변수명

// alert("과제를해");
// let reply = confirm("과제를 했니?");
// let name = prompt("이름을 입력하세요");
// // document.write("<b>"+ name + "</b>님 안녕하세요");
// console.log(name + "님 환영합니다");

// let width;
// let height;
// width = 200;
// height = 90;
// let area = width * height;
// console.log(area);

// const 는 프로그램 안에서 값을 변경할 수 없다. 원주율 원의 넓이
// const a = b    a값이 b 로 고정
// const pie = 3.14;
// let radius = prompt("반지름을 입력하세요");
// let area = pie * radius * radius;
// console.log(area);

// let Number = parseInt(prompt("숫자를 입력하세요"));
// if (Number % 3 == 0) {
//     console.log("3의 배수입니다")
// } else {
//     console.log("3의 배수가 아니다")
// }
// for (초깃값; 조건; 증가식) {}

// let sum = 0;
// for (let i = 1; i<=10000135326262727270; i++) {
//     sum += i;
// }
// document.writeln(`${sum}`);
// // i 는 iterator 반복자

// let name = "Kim";
// let classroom = 204;
// console.log(`${name},님 ${classroom}호 강의실로 입장하세요`);

// let number1 = 12 / 2;
// let number2 = 15 % 2;
// console.log(`${number1}`); console.log(`${number2}`);

// let season = ["봄","여름","가을","겨울"]
// console.log(season[2])

// // class="button btn btn-primary"

// let myObject = {
//     name: '객체',
//     value: 10
// };
// for (let prop in myObject) {
//     console.log(`${prop}, 값: ${myObject[prop]}`);
// }
let fruits = ['사과', '복숭아', '수박', '참외']
// // fruits[2] = '우박'
// console.log(fruits[0]);

for (let i = 0; i < 4; i++) {
    console.log(fruits[i]);
}
let students = [{
    stdNo: 100,
    stdName: '김김김',
    score: 10
}, {
    stdNo: 200,
    stdName: '이이이',
    score: 20
}, {
    stdNo: 300,
    stdName: '박박박',
    score: 30
}];

let str = `<ul>`;
for (let i = 0; i <= 2; i++) {
    console.log(students[i].stdNo);
    str += `<li>이름: ${students[i].stdName}, 점수: ${students[i].score}</li>`;
}
str += `</ul>`;
document.writeln(str);

let studnets = [{
    stdNo: 100,
    stdName: '나나나',
    score: 90
}];

document.querySelector('button#addBtn')
    .addEventListener('click', function () {
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
        document.querySelector('#student_no').value = '';
        document.querySelector('#student_name').value = '';
        document.querySelector('#score').value = '';
    });

document.querySelector('.addBtn')
    .addEventListener('click', function () {
        let sno = document.querySelector('#student_no').value;
        let score = document.querySelector('#score').value;
        let nodeList = document.querySelectorAll('#list tbody tr');
        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].children[0].innerHTML == sno) {
                nodeList[i].children[2].innerHTML = score;
            }
        }
    });

function createStdList() {
    let str = ``;
    for (let i = 0; i < students.length; i++) {
        str += `
        <tr onclick='showInfo(event)'>
            <td>${students[i].stdNo}</td>
            <td>${students[i].stdName}</td>
            <td>${students[i].score}</td>
            <td>
                <button class='btn btn-danger' onclick='removeRow(event)'>삭제</button>
            </td>
        </tr>`;
    }
    document.querySelector('#list tbody').innerHTML = str;
}
createStdList();
console.log(document.querySelectorAll('button'));

function removeRow(e) {
    e.target.parentElement.parentElement.remove();
}

function showInfo(e) {
    document.querySelector('#student_no').value = e.target.parentElement.children[0].innerHTML;
    document.querySelector('#student_name').value = e.target.parentElement.children[1].innerHTML;
    document.querySelector('#score').value = e.target.parentElement.children[2].innerHTML;
}