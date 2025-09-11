/*
 text3.js
*/
// prompt 함수를 활용. 2개의 숫자값을 입력. 
// 2수의 합이 3의 배수인지, 3의 배수가 아닌지 판별.
// "3" -> 3
let num = prompt("첫째 숫자 입력:");
let num1 = prompt("둘째 숫자 입력:");
let result = parseInt(num) + parseInt(num1);
console.log(result);
// parseInt 정수 parseFloat 실수 

if (result %3 == 0){
    console.log('3의 배수입니다');
} else{
    console.log('3의 배수가 아닙니다');
}
