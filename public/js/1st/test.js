/*
 * test.js
 */
// 학생(학생번호: 101, 학생이름: 김민수, 영어: 87, 수학: 90)
let student = {
    idnum: 101,
    name: "김민수",
    en: 87,
    math: 90
}

console.log("이름은 " + student.name);
student.name = "김만수";
console.log("이름은 " + student.name);

console.log("김만수의 영어점수는 " + student.en)

let fruits = [{
    apple: "사과"
}, {
    peach: "복숭아"
}, {
    waterm: "수박"
}];
console.log("내가 좋아하는 과일은 " + fruits[0].apple);

// 0911과제 todo.js 만들어서 switch case 조건문 if else if .. else 구문으로 작성.

