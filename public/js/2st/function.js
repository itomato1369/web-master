// function.js
// 함수: 코드의 묶음.
//
// let n1 = 0;
// let n2 = 0; //global//

// const n4 = 30;
// var n5 = 0;

// {
//     let n2 = 2; //  {} 혹은 () 안에 들어가면 local//
//     console.log(`${n2}`);
// }
// let n = 0;
// console.log(`${n2}`);


// function varFunc() {
//     let n1 = 100;
//     n1 = 20;
//     console.log(`local=> ${n1}`);
// }
// varFunc();
// console.log(`global => ${n1}`);

// function left(n1, n2) {
//     let result = n1 + n2;
//     console.log(`결과는 ${result}`);
// }
// left(5, 1);

// // function2.js
// // 구구단 3단을 콘솔에 출력하는 함수 => multiplication 
// function multiplication(num) {
//     for (let i = 1; i < 10; i++) {
//         console.log(`${num} * ${i} = ${num * i}`);
//     }
// }
multiplication(5);

// //매개변수(2개) 2개를 비교해서 큰 숫자를 콘솔에 표시.
function showMax(num1, num2) {
    if (num1 > num2) {
        console.log(`${num1}`);
    } else {
        console.log(`${num2}`);
    }
}
showMax(15, 70);

// //매개값을 2개 => 1 ~ 10 까지 다 더하는 기능 : 1+2+3+...+10
// sum = 0;

// function sumBy2Number(num1, num2) {
//     for (let i = num1; i <= num2; i++) {
//         sum += i;
//     }
//     console.log("sum: " + sum);
// }
// sumBy2Number(1, 10);

// //    for (조건) {조건이 참일때 실행되는 구간.}

// // function3.js
// // let result = Math.max(10,20);
// // console.log(`큰값은 ${result}`);
// // return sum; //함수를 호출한 영역으로 값을 변환

// function add(num1, num2) {
//     let sum = num1 + num2;
//     return sum; // sum 값을 반환하고 함수를 종료합니다.
// }
// // let result = add(6, 3); // add 함수를 호출하고 반환 값을 result에 저장합니다.
// // console.log(result); // 8 이 출력됩니다.

// function sum(n1, n2) {
//     return n1 + n2;
// }
// let result = sum(sum(10, 20))