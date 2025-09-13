//0912 과제

// 2개의 값을 입력받도록... 화면구성(html)
// 계산하는 기능 구현 사칙연산
// 함수 이름 정의 plus, minus, multiply, divide
//
// document.querySelector('#') 은 #앞에 붙은 주소를 찾는 것
// const a = b    a값이 b 로 고정


function plus(num1, num2) {
    return num1 + num2;
}
function minus(num1, num2) {
    return num1 - num2;
}
function multiply(num1, num2) {
    return num1 * num2;
}
function divide(num1, num2) {     // 나누기할 때 왜 0 / 2 는 되는데, 2 / 0 은 안되는지
    if (num2 == 0) {
        return "0으로 나눌 수 없습니다";
    } else {
        return num1 / num2;
    }
} 
