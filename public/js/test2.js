/*
 * test2.js
 */

let friend1 = {
    name: "김동우",
    height: 170
}
let friend2 = {
    name: "산리오",
    height: 190
}

// friend1 이 friend2보다 크냐?
// friend1이 크다 vs. friend1이 작다.
if (friend1.height > friend2.height) {
    console.log(friend1.name + '(이)가 크다');
}
if (friend1.height < friend2.height) {
    console.log(friend2.name + '(이)가 크다');
}
if (friend1.height == friend2.height) {
    console.log(friend1.name + friend2.name + '의 키가 같다');
}

let num3 = prompt("숫자를 입력하세요: ");
console.log(num3); // 사용자의 입력값 => 홀수/짝수 출력.
// result = num3 % 2 == 1;
if (num3 % 2 == 0) {     //조건만족. 
    console.log('짝수입니다.');
}
else {
    console.log('홀수입니다.');
}
// if ... else ... 조건이외의 경우.