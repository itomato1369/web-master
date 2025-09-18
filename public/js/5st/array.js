// array.js
// filter()  true값에 해당하는 요소들을 새로운 배열 저장.

const names = ['김김김', '박이박', '황황황', '최최최', '김이박'];
const result = names.filter((item) => {
    if (item.indexOf('이박') != -1) {
        return true;
    } else {
        return false;
    }
});
console.log(result);

// const result = names.filter((item) => {
//     if (item.indexOf('김') == 0) {
//         return true;
//     } else {
//         return false;
//     }
// });

// const result = names.filter((item) => {
//     return item.indexOf('김') == 0 ? true : false;
// });

// const result = names.filter((item) => item.indexOf('김') == 0);
// console.log(result);

// const numbers = [23, 44, 22, 57, 80, 19];
// const evenNumbers = numbers.filter((item) => 
//     item % 2 == 0
// );
// console.log(evenNumbers);

// map() =>  A -> A'  mapping
// const students = [
//     {sno: 100, sname: 'abc', score: 21},
//     {sno: 200, sanme: 'def', score: 52},
//     {sno: 300, sname: 'ghi', score: 93},
//     {sno: 400, sname: 'jkl', score: 70}
// ];
// const pass = students.map((item) => {
//     let {sno,sname} = item;
//     let isPass = item.score > 60 ? "pass" : "fail";
//     return {sno, sname, isPass};
// });
// console.log(pass);

// pass.forEach((item) => {
//     if (item.isPass == "pass") {
//         console.log(item);
//     }
// });

// students.map((item) => {
//     let {sno,sname} = item;
//     let isPass = item.score > 60 ? "pass" : "fail";
//     return {sno, sname, isPass};
// })
// .filter((item) => item.isPass == "pass")
// .forEach((item) => {
//     console.log(item);
// });

