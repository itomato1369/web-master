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
// let fruits = ['사과', '복숭아', '수박', '참외']
// // // fruits[2] = '우박'
// // console.log(fruits[0]);

// for (let i = 0; i < 4; i++) {
//     console.log(fruits[i]);
// }
// let students = [{
//     stdNo: 100,
//     stdName: '김김김',
//     score: 10
// }, {
//     stdNo: 200,
//     stdName: '이이이',
//     score: 20
// }, {
//     stdNo: 300,
//     stdName: '박박박',
//     score: 30
// }];

// let str = `<ul>`;
// for (let i = 0; i <= 2; i++) {
//     console.log(students[i].stdNo);
//     str += `<li>이름: ${students[i].stdName}, 점수: ${students[i].score}</li>`;
// }
// str += `</ul>`;
// document.writeln(str);

// let studnets = [{
//     stdNo: 100,
//     stdName: '나나나',
//     score: 90
// }];

// document.querySelector('button#addBtn')
//     .addEventListener('click', function () {
//         let sno = document.querySelector('#student_no').value;
//         let sname = document.querySelector('#student_name').value;
//         let score = document.querySelector('#score').value;

//         if (sno == '' || sname == '' || score == '') {
//             alert('값을 입력하세요');
//             return;
//         }
//         students[students.length] = {
//             stdNo: sno,
//             stdName: sname,
//             score: score
//         };
//         console.log(students);
//         createStdList();
//         document.querySelector('#student_no').value = '';
//         document.querySelector('#student_name').value = '';
//         document.querySelector('#score').value = '';
//     });

// document.querySelector('.addBtn')
//     .addEventListener('click', function () {
//         let sno = document.querySelector('#student_no').value;
//         let score = document.querySelector('#score').value;
//         let nodeList = document.querySelectorAll('#list tbody tr');
//         for (let i = 0; i < nodeList.length; i++) {
//             if (nodeList[i].children[0].innerHTML == sno) {
//                 nodeList[i].children[2].innerHTML = score;
//             }
//         }
//     });

// function createStdList() {
//     let str = ``;
//     for (let i = 0; i < students.length; i++) {
//         str += `
//         <tr onclick='showInfo(event)'>
//             <td>${students[i].stdNo}</td>
//             <td>${students[i].stdName}</td>
//             <td>${students[i].score}</td>
//             <td>
//                 <button class='btn btn-danger' onclick='removeRow(event)'>삭제</button>
//             </td>
//         </tr>`;
//     }
//     document.querySelector('#list tbody').innerHTML = str;
// }
// createStdList();
// console.log(document.querySelectorAll('button'));

// function removeRow(e) {
//     e.target.parentElement.parentElement.remove();
// }

// function showInfo(e) {
//     document.querySelector('#student_no').value = e.target.parentElement.children[0].innerHTML;
//     document.querySelector('#student_name').value = e.target.parentElement.children[1].innerHTML;
//     document.querySelector('#score').value = e.target.parentElement.children[2].innerHTML;
// }
// const obj = {
//     name: 'rrr',
//     age: 12,
//     showInfo: function () {
//         return `이름은 ${obj.name}, 나이는 ${obj.age}`;
//     }
// }
// console.log(obj);

// const fruits = ['사과', '복숭아', '수박', '딸기'];
// fruits[fruits.length] = '배'; // 마지막에 추가
// fruits[fruits.length] = '참외'; // 마지막에 추가
// fruits[0] = '포도';
// fruits.push(`메론`); //추가하고 length추가 
// delete fruits[0];
// fruits.unshift(`굴비`);
// console.log(fruits);

// fruits.splice(1, 1); //index 위치 , 삭제할 갯수
// fruits.splice(0, 0, '거봉');
// for (let i = 0; i < fruits.length; i++) {
//     console.log(fruits[i]);
// }
// const numAry = new Array();
// numAry.push(10);
// numAry.push(25);
// numAry.push(34);
// numAry.push(47);
// numAry.splice(0, 0, 33);
// console.log(numAry);

// let sum = 0;
// numAry.forEach(function (item, idx, ary) {
//     console.log(item);
//     if (item % 2 == 1) {
//         sum += item;
//     }
// });
// console.log(`sum의 값은 ${sum}`);

// numAry.forEach(function (item, idx, ary) {
//     console.log(idx);
//     if (idx % 2 == 0) {
//         sum += item;
//     }
// });


// const friends = [{
//     name: 'rae',
//     phone: '010-124-124'
// }];
// friends.push({
//     name: 'wef',
//     phone: '010-243-124'
// });
// friends.push({
//     name: 'rew',
//     phone: '010-223-131'
// });

// friends.forEach(function (item, idx, ary) {
//     if (idx == 0) {
//         console.log(`이름은 ${item.name}`);
//     }
// });

// console.log(['오렌지', '감', '사과', '수박', '당근'].sort());
// console.log([10, 421, 32, 64, 26, 513].sort(function (a, b) {
//     if (a < b) {
//         return -1;
//     } else {
//         return 0;
//     }
// }));

// const now = new Date();
// console.log(now.toLocaleDateString());
// console.log(now.toLocaleTimeString());

// // let today = new Date('2025-09-15 10:30:30');
// today.setFullYear(2024);
// today.setMonth(8); // 9월
// console.log(today.toLocaleDateString());
// console.log(today.getFullYear());
// console.log('월:' + (today.getMonth() + 1));
// console.log('일:' + today.getDate());
// console.log('요일:' + today.getDay());

// function translateDay(dateStr) {
//     let dayAry = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
//     let today = new Date(dateStr);
//     let day = today.getDay();
//     return dateStr + '은' + dayAry[day] + '입니다';
// }
// console.log(translateDay('2025-10-01'));

// // let tr = document.createElement('tr');
// // for (let d = 1; d <=31; d++) {
// //     let td = document.createElement('td');
// //     td.innerHTML = d;
// //     tr.appendChild(td);
// //     if(d % 7 == 0) {
// //         tr = document.createElement('tr');
// //     }
// //     document.querySelector('tbody').appendChild(tr);
// // }

// // let spaces = 0;
// // let tr = document.createElement('tr');
// for (let d = 1; d <= 31; d++) {
//     let td = document.createElement('td');
//     td.innerHTML = d;
//     tr.appendChild(td);
//     if (d % 7 == 0) {
//         tr = document.createElement('tr');
//     }
//     document.querySelector('tbody').appendChild(tr);
// }
// for (let s = 0; s < spaces; s++) {
//     let td = document.createElement('td');
//     tr.appendChild(td);
// }
// let yyyy = 2025,
//     mm = 9;
// let today = new Date();
// today.setFullYear(yyyy);
// today.setMonth(mm - 1);
// today.setDate(1);

// let spaces = today.getDay();
// today.setMonth(mm);
// let lastDate = new Date(today.getTime() - (1000 * 60 * 60 * 24));
// lastDate = lastDate.getDate();

// let caption = document.createElement('caption');
// caption.innerHTML = `${yyyy}년/ ${mm}월`

// let tr = document.createElement('caption');
// for (let s = 0; s < spaces; s++) {
//     let td = document.createElement('td');
//     td.innerHTML = d;
// }
