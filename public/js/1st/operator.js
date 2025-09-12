/*
 * operator.js
 */
let num1 = 10; // 변수를 초기화.
let num2 = 20;
let result;
result = num1 + num2;
console.log("결과는 " + num1 + num2); // 결과는 1020  문자열이 앞에있으면 다 문자로 인식
console.log("결과는 " + (num1 + num2)); // 결과는 30  () 괄호를 하면 먼저 연산
console.log("결과는 " + num1 + num2); // 결과는 1020  문자열이 앞에있으면 다 문자로 인식
console.log((num1 + num2) + "입니다."); // 결과는 숫자 입니다.

num1 = 425;
result = num1 % num2;
console.log('나머지 ' + result);

console.log(num1 % 2); // 짝수/홀수 구분. 

num1 = 3;
result = num1 % 2 == 0; // false

// 조건문. = 대입하겠다. == 같다, 비교하다, 조건을 만족하면. 
// num1 > num2 1이 크다. num1 < num2 2가 크다.
// => true/false 결과값.
if (result) {
    console.log('짝수입니다.');
}
if (num1 % 2 == 0) {
    console.log('짝수입니다.');
}
if (num1 % 2 == 1) {
    console.log('홀수입니다.');
}