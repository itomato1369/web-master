// object.js
// let obj = {} //객체
// let obj2 = obj;
// console.log(obj == obj2);

// let obj3 = {}
// obj.name = 'Hong';
// obj.age = 20;

// obj3.name = 'Hong';
// obj3.age = 20;
// console.log(obj.name == obj3.name); // false가 나옴 왜?=> 주소값을 비교 주소는 다름
// // 객체(object)는 다름 


// //원시 데이터 타입. string number boolean 실제 변수의 값
// let str1 = 'Hong';
// let str2 = 'Hong';
// let ary = []; // 객체
// console.log(typeof ary); // typeof 변수가 어떤 값을 담았는지

// str1 = 10;
// str2 = '10';
// console.log(str1 === str2); // === 데이터 타입도 같은지

// // 함수의 정의식
// // function sum(num1, num2) {
// //     return num1 + num2;
// // }
// // 함수의 표현식  변수에다가 함수를 담음 방식만 다를 뿐 똑같음
// // const sum = function (num1, num2) {
// //     return num1 + num2;
// // }
// // console.log(sum(1,2));

// // 줄인 표현식 => 화살표 함수.
// // const sum = (num1, num2) => {
// //     return num1 + num2;
// // }
// // console.log(sum(1, 2));

// const sum = (num1 = 0, num2 = 0) => num1 + num2;
// // 애는 대신 구문이 하나일 때만  NaN = Not a Number
// console.log(sum(sum(1, 2), sum(2)));

// // [23, 10, 17, 45].forEach((item) => console.log(item));

// const greeter = function(name) {
//     console.log("hello" + name);
// }
// greeter("Alberto");
// const greeter = (name) => console.log("hello" + name);
// greeter("Alberto");


// scope.js 영역
// 전역(global) & 지역(local)
// var & let, const

// var myAge = 20; // 전역 변수 함수 밖에서 선언 
// // var 전역이냐 지역이냐 let&const 블럭단위


// function showAge() {
//     var myAge = 22; // 지역 변수 함수 안에서만 유효함
//     console.log(myAge + 1);
// }
// showAge();
// console.log(myAge + 1);

// {
//     var myAge = 10; // let 선언을 해도 이 블럭 안에서만
//     myAge += 1; // 전역 변수
// }
// console.log(myAge + 1);


// this.js
// 1) 함수에서 window객체를 가리킴
// 2) 이벤트에서 이벤트를 받는 대상을 가리킴
// 3) 객체에서 객체를 가리킴

function sum(n1, n2) {
    console.log(this);
    return n1 + n2;
}
sum(1, 2);

document.querySelector('table').addEventListener('click', function (e) {

    console.log(this);
})

const obj = {
    name: "Hong",
    show: function () {
        console.log(this);
        return `이름은 ${this.name}`;
    }
}
obj.show();