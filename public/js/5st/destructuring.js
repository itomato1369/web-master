// destructuring.js      객체와 배열에 대해서 씀 destruction
// const person = {
//     name: 'italy',
//     age: 55,
// };

// let {name,age} = person;
// // let name = person.name; // name: 'italy'
// // let age = person.age; // age: 55

// const numAry = [10, 20, 30]; // 배열 dest...
// let [n1, n2, n3] = numAry;
// console.log(n1, n2, n3);

// 배열 메소드method: forEach(), map(), filter(), reduce()
const stdAry =  
[{sno:100, name:'apa',score:31},
{sno:200, name:'baba',score:62},
{sno:300, name:'caca',score:80},
];
// const newAry = [];
// stdAry.forEach((item) => {
//     if (item.score >= 60) {
//         newAry.push(item);
//     }
// });
// console.log(newAry);

// const newAry = stdAry.filter((item) => {
//     if (item.score > 70) {
//         return true;
//     } else {
//         return false;
//     }
// });
// console.log(newAry);


// map() a -> a'
// const newAry = stdAry.map((item) => {
//     const obj = {}
//     obj.sno = item.sno;
//     obj.name = item.name;
//     return obj;
// });
// console.log(newAry);

// const newAry = stdAry.map((item) => {
//     const {sno:sn, name:nam} = item; // 객체distructuring 
//     return {sn, nam};
// });
// console.log(newAry);


