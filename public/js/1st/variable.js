/*
 * variable.js  변수파일
 */
let myName = "김동우"; // 문자열.
let myAge = 20; // 숫자형.
let pets = [{
    name: "냐옹이",
    age: 3
}, {
    name: "멍무이",
    age: 4
}]; // 배열. {name, age}

let myFriend = {
    name: "김동우",
    age: 20,
    phone: "010-1234-5678",
    address: "대구 중구 56번지"
} // 객체.
// console.log(myFriend.name); // 변수(객체).속성
// console.log(myFriend.phone);
// 냐옹이의 이름, 나이
console.log(pets[0].age);
pets[0].age = 2; // 변수의 값을 변경.
console.log(pets[0].age);