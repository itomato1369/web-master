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

let sum = 0;
for (let i = 1; i<=10000135326262727270; i++) {
    sum += i;
}
document.writeln(`${sum}`);
// i 는 iterator 반복자

let name = "Kim";
let classroom = 204;
console.log(`${name},님 ${classroom}호 강의실로 입장하세요`);

let number1 = 12 / 2;
let number2 = 15 % 2;
console.log(`${number1}`); console.log(`${number2}`);

let season = ["봄","여름","가을","겨울"]
console.log(season[2])

// class="button btn btn-primary"
