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
// var fruits = ['apple','banana','orange'];
// for (var i = 0; i < fruits.length; i++) {
//     console.log(fruits[i]);
// }

// var usename = "Alberto Montalesi";

// let username = "Alberto Montalesi";
// const username = "Alberto MOntalesi";  // let 과 const는 겹칠 수 없다
// const age = 26;   // const로 선언한 값에는 새로운 값을 추가할 수 없다
// age = 27;
// let height = 190;
// height = 188; // let 은 새로운 값 재설정은 할 수 있지만 

// let width = 12;
// let width = 144;   //이건 안됨

// var userID;
// userID = 12;
// console.log(typeof userID); // number 
// userID = 'user1';
// console.log(typeof userID); // string 문자열

// let userName = "Alberto";
// console.log(userName);

// let age = 25;
// let married = false;
// console.log();

// const car = {
//     wheels: 4,
//     color: "red",
// };
// const car = {
//     wheels: 4,
//     color: "red",
//     drive: function () {
//         console.log("wroom wroom");
//     }
// };
// car.drive();   //car에 있는 drive 객체에 소속되어있는 method


// const car = {} // 빈 객체를 생성
// car.color = 'red';
// console.log(car);

// const car = {
//     wheels: 4,
//     color: "red",
// };
// console.log(car.wheels);
// console.log(car.color);

// const car = {
//     wheels: 4,
//     color: "red",
//     "goes fast": true 
// };
// console.log(car["goes fast"]);  // 여러 단어로 된 속성 []로 묶음

// const cars = {
//     ferrari: "california",
//     porshe: "911",
//     bugatti: "veyron"
// };
// const key = "ferrari";
// console.log(cars[key]);   // 변수에 저장된 객체의 속성에 접근하려면 []

// let car = {
//     color: 'red',
// };
// let secondCar = car; // car 에 대한 참조 주소를 저장

// let car = {color: 'red'};
// let secondCar = car;
// car.wheels = 4;

// console.log(car);
// console.log(secondCar);
// console.log(car == secondCar);
// console.log(car === secondCar);

// const emptyObj1 = {};
// const emptyObj2 = {};
// console.log(emptyObj1 == emptyObj2);
// console.log(emptyObj1 === emptyObj2); // 빈 객체 끼리는 false 동일한 속성이라도 객체가 같아야함
// // 객체와 변수의차이 
// 변수 (Variable)
// 역할: 데이터를 저장할 수 있는 '이름' 또는 '메모리 공간'을 가리킵니다. 
// 저장 방식: 원시 타입(숫자, 문자열 등)의 데이터를 변수에 할당하면 해당 값이 변
// 수에 직접 저장됩니다. 
// 예시: let name = "홍길동"; 에서 name은 변수이며, 
// `"홍길동"`이라는 문자열 값을 저장하고 있습니다. 
// 객체 (Object)
// 역할: 여러 개의 데이터를 하나의 단위로 묶어 관리할 수 있는 데이터 타입입니다. 
// 구조: `키(key)`와 `값(value)`의 형태로 데이터를 포함하며,
//  각 키는 고유한 이름을 가지고 있습니다. 
// 저장 방식: 객체를 변수에 할당하면, 객체 자체의 값이 아니라 
// 객체가 저장된 메모리 주소(참조 값)가 변수에 저장됩니다. 
// 예시: let person = { name: "홍길동", age: 30 }; 에서 person은 변수이고,
//  이 변수는 name과 age라는 두 개의 키와 그에 해당하는 값("홍길동", 30)을 
// 가진 객체를 참조하고 있습니다. 
// const obj1 = {a: 1};
// const obj2 = obj1;
// console.log(obj1 == obj2);
// console.log(obj1 === obj2);

// const fruitBasket = ['apple','banana','orange']; // 배열에 접근할 때는 index를 사용 index는 0부터 시작
// console.log(fruitBasket[0]);
// console.log(fruitBasket[1]);
// console.log(fruitBasket[2]);
// console.log(fruitBasket[3]);

// console.log(fruitBasket.length);   // .length index의 크기 길이를 확인
// fruitBasket.push('pear'); // 배열 마지막에 값 하나 추가
// console.log(fruitBasket); // 배열확인
// fruitBasket.unshift('melon'); // 배열의 시작에 값 하나 추가
// console.log(fruitBasket); // 배열확인
// fruitBasket.pop(); // 배열의 끝에서 값 하나를 제거
// console.log(fruitBasket); // 배열확인
// fruitBasket.shift(); // 배열의 시작에서 값 하나를 제거
// console.log(fruitBasket);

// const str = "hello";
// console.log(typeof(str));  // string 배열
// const num = 12;
// console.log(typeof(num));
// const arr = [1,2,3];
// console.log(typeof(arr)); // object 객체   arry 배열은 객체다.

// console.log(typeof(null));

// function greet(name) {
//     console.log("hello " + name);
// }
// greet("ef");

// let myInt = 1;
// function increase(value) {
//     return value += 1;
// }
// console.log(myInt);
// console.log(increase(myInt));
// console.log(myInt);

// let myCar = {
//     maker: "bmw",
//     color: "red"
// };
// console.log(myCar);

// function changeColor(car) {
//     car.color = "blue";
// }
// changeColor(myCar);
// console.log(myCar);

// const greeter = function greet(name) {
//     console.log("hello " + name);
// };

// var myInt = 1;
// if (myInt === 1) {
//     var mySecondInt = 2;
//     console.log(mySecondInt);
// }
// console.log(mySecondInt);
// var myInt = 1;
// if (myInt === 1) {
//     let mySecondInt = 2;
//     console.log(mySecondInt);
// }
// let myInt = 1;

// function increase(value) {
//     return value += 1;
// }
// console.log(myInt);
// console.log(increase(myInt));
// let myCar = {
//     maker: "bmw",
//     color: "red"
// };
// console.log(myCar);

// const changeColor = (car) => {
//     car.color = "blue";
//     car.maker = "toyota";
// };
// changeColor(myCar);
// console.log(myCar.color);

// // const greeter = function greet(name) {
// //     console.log("hello " + name);
// // };
// // greeter("olleh");

// const greeter = (name) => {
//     console.log("hello " + name);   // 문자열과 숫자는 + 할 수 없음
// };
// greeter("");

// const myInt1 = 1;

// if (myInt1 == 1) {
//     let mySecondInt = 2;
//     console.log(mySecondInt);
// }
// console.log(myInt1);

// const myInt = 1;

// if (myInt === 1) {
//     let mySecondInt = 2;
//     console.log(mySecondInt);
// }

// var myInt = 1;
// if (myInt === 1) {
//     let mySecondInt = 2;
//     console.log(mySecondInt);
// }
// const myCar = {
//     color: 'red',
//     logColor: function() {
//         console.log(this.color);  // this는 myCar
//     }
// };
// myCar.logColor();

// function logThis() {
//     console.log(this);
// }
// logThis();

// const myCar = {
//     color: 'red',
//     logColor: function() {
//         console.log(this.color);
//     },
// };
// const unboundGetColor = myCar.logColor;
// console.log(unboundGetColor());
// const boundGetColor = unboundGetColor.bind(myCar);
// console.log(boundGetColor());

// for (var i = 0; i < 10; i++) {
//     var leak = 'I am available outside of the loop';
// }
// console.log(leak);

// function myFunc() {
//     var functionScoped = 'I am available inside this function';
//     console.log(functionScoped);
// }
// myFunc();

// let x = 'global';
// if (x === 'global') {
//     let x = 'block-scoped';
//     console.log(x);
// }
// console.log(x);

// 0918 과제 Array.from() 예습   객체를 받아 배열로 변환
// const fruits = document.querySelectorAll('.fruits p');
// //클래스가 fruits에  3개의 p태그 포함하여 다 가지고 오겠다
// const fruitArray = Array.from(fruits); // fruits를 배열로 변환
// console.log(fruitArray);
// const fruitNames = fruitArray.map(fruit => fruit.textContent);
// // 위에서 배열로 바꿨으니 map()을 사용할 수 있다
// console.log(fruitNames);

// const fruits = Array.from(document.querySelectorAll('.fruits p'));
// const fruitNames = fruits.map(fruit => fruit.textContent);  
// // .textContent 는 순수한 텍스트 콘텐츠만 가져오거나 설정
// console.log(fruitNames);

// const fruits = document.querySelectorAll('.fruits p');
// const fruitArray = Array.from(fruits, fruit => {
//     console.log(fruit);
//     return fruit.textContent;
// });
// console.log(fruitArray);

// const digits = Array.of(1, 2, 3, 4, 5); 
// // Array.of()는 전달 받은 모든 인수로 배열을 생성한다
// console.log(digits);

// const array = [1,2,3,4,5];
// // 배열의 원소 중 3보다 큰 첫 원소를 반환한다
// let found = array.find(e => e > 3);
// console.log(found);

// // Array.findIndex() 조건과 일치하는 첫 번째 원소의 인덱스를 반환한다
// const greetings = ['hello','hi','byebye','goodbye','hi'];
// let foundIndex = greetings.findIndex(e => e === 'hi');
// console.log(foundIndex);

// const array = [1, 2, 3, 4, 5, 6, 1, 2, 3, 1];
// let arraySome = array.some(e => e > 2);
// console.log(arraySome);

// let arrayEvery = array.every(e => e > 2);
// console.log(arrayEvery);
// // 2보다 큰 원소가 존재하지만 모든 원소가 2보다 크지는 않기 때문에 false 

// const greetings = ['hello', 'hi', 'byebye', 'goodbye', 'hi'];
// let foundIndex = greetings.findIndex(e => e === 'hi');
// console.log(foundIndex);
// // 조건과 일치하는 첫 번째 원소의 인덱스만 반환

const array = [1, 2, 3, 4, 5, 6, 1, 2, 3, 1];
let arraySome = array.some(e => e > 2);
console.log(arraySome);

let arrayEvery = array.every(e => e > 2);
console.log(arrayEvery);

console.log(i);
var i = 'I am a variable';    
// var 는 정의되기 전에 접근 할 수 있지만 그 값에는 접근할 수 없다

let j = 'I am a let';
console.log(j);

// var greeting = 'Hello';
// greeting = 'Farewell';
// for (var i = 0; i < 2; i++) {
//     var greeting = 'Good morning';
// }
// console.log(greeting);

let value = 1;
if (true) {
    let value = 2;
    console.log(value);
}
value = 3;

let x = 100;
if (x > 50) {
    let x = 10;
}
console.log(x);

// console.log(constant);
// const constant = 1;

// 함수 간략하게 줄이는 법
// const greeting = function (name) {
//     return 'hello ' + name;
// };
// // console.log(greeting);
// console.log(greeting('안녕'));

// var greeting = (name) => {
//     return `hello ${name}`;
// }
// console.log(greeting('아침')

const greeting = name => `hello ${name}`;
const oldFunction = function(name) {
    return 'hello' + name;
};
// const arrowFunction = name => `hello ${name}`;
const arrowFunction = (name) => {
    return ``

}