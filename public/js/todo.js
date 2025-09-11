// 0911 과제

// switch case 조건문
// switch 조건문의 기본 문법
switch (condition) {
    case value1:
        statement1;
        break;
    case value2:
        statement2;
        break;
    default:
        statement3;
}
// condition의 값이 value1 이면 statement1을 
// value2면 statement2를 
// 그 어느 것도 아니라면 default가 적용되어 statement3을 실행
let answer = 2 + 2;
switch (answer) {
    case 1:
        alert('틀린 답입니다');
    case 2:
        alert('틀린 답입니다');
    case 3:
        alert('틀린 답입니다');
    case 4:
        alert('정답입니다');
}


// if else if..else 구문
// if 의 기본 문법
if (condition) { /* 조건이 참일 경우 실행할 코드 */

} else {
    /* 대신 실행할 다른 코드 */
}

//나이가 18살 이상이면 true 아닐경우 false
let age = 24;
if (age >= 18) {
    alert('true');
} else {
    alert('false');
}

