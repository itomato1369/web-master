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
// const pie = 3.14;
// let radius = prompt("반지름을 입력하세요");
// let area = pie * radius * radius;
// console.log(area);
let Number = parseInt(prompt("숫자를 입력하세요"));
if (Number % 3 == 0) {
    console.log("3의 배수입니다")
} else {
    console.log("3의 배수가 아니다")
}