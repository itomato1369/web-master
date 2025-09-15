// array.js 배열
//   인덱스     0       1        2      3  
let fruits = ['사과','복숭아','수박','참외'];
fruits[1] = '멜론';
console.log(fruits[4]);

console.clear();
for (let i = 0; i < 4; i++) {
    console.log(fruits[i]);
}

let students = [{stdNo: 100, stdName: "김민기", score: 80},
    {stdNo: 200, stdName: "김민우", score: 70},
    {stdNo: 300, stdName: "김민지", score: 85}
];
let str = `<ll>`;
for (let i = 0; i < 3; i++) {
    console.log(students[i].score);
    str += `<li>학생번호: ${students[i].stdNo}, 이름: ${students[i].stdName}</li>`;
}
str += `</ll>`;
document.writeln(str);
