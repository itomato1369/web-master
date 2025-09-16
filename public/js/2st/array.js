// array.js 배열
//   인덱스     0       1        2      3  
// let fruits = ['사과','복숭아','수박','참외'];
// fruits[1] = '멜론';
// console.log(fruits[4]);
// undefined 불확정한, 일종의 값임
// null  유효하지 않음 아예 아무것도 없다
ㄴ
// console.clear();
// for (let i = 0; i < 4; i++) {
//     console.log(fruits[i]);
// }

// let students = [{stdNo: 100, stdName: "김민기", score: 80},
//     {stdNo: 200, stdName: "김민우", score: 70},
//     {stdNo: 300, stdName: "김민지", score: 85}
// ];
// let str = `<ul>`;
// for (let i = 0; i < 3; i++) {
//     console.log(students[i].score);
//     str += `<li>학생번호: ${students[i].stdNo}, 이름: ${students[i].stdName}</li>`;
// }
// str += `</ul>`;
// document.writeln(str);


// arry2. 0916 배열 메소드.


// const obj = {
//     name: '손흥민',
//     age: 33,
//     showInfo: function () {
//         return `이름은 ${obj.name}, 나이는 ${obj.age}`;
//     }
// }
// console.log(obj);

// const fruits = ['사과','복숭아','수박','딸기']; // fruits.length는 배열의 크기
// fruits[fruits.length] = '배';
// fruits[fruits.length] = '참외';
// fruits[0] = '포도';
// delete fruits[0];

// // 메소드. 추가, 삭제(push, pop)
// fruits.push(`메론`);
// fruits.pop();
// // unshift, shift
// fruits.unshift // 시작부분에 추가하겠다
// fruits.unshift(`메론`);
// fruits.shift(); // shift로 시작부분에 간 요소를 꺼내

// // splice
// // fruits.splice(1, 1); //  index위치, 삭제할 갯수, 대체값
// // fruits.splice(0, 1, '거봉');
// // fruits.splice(5, 0, '바나나');
// // fruits.splice(1, 3, '바나나');

// // for (let i = 0; i < fruits.length; i++) {
// //     console.log(fruits[i]);
// // }

// const numAry = new Array();
// numAry.push(10); // [10]
// numAry.push(25); // [10, 25]
// numAry.push(34);
// numAry.unshift(47);
// numAry.splice(2, 0, 33);
// numAry.splice(2, 0, 22, 19);

// let sum = 0;
//                          //매개값
// // numAry.forEach(function (item, idx, ary) {   // 배열에 있는 요소, 인덱스, 배열자신
// //    console.log(item);
// //    if (item % 2 == 1) {
// //     sum += item;
// //    }
// // });
// // console.log(`sum의 값은 ${sum}`)

// // numAry.forEach(function (item, idx, ary) {   // 배열에 있는 요소, 인덱스, 배열자신
// //    console.log(idx);
// //     if (idx % 2 == 0) {
// //         sum += item;
// //     }

// // });
// // console.log(`sum의 값은 ${sum}`);

// numAry.forEach(function (item, idx, ary) {   // 배열에 있는 요소, 인덱스, 배열자신
//    console.log(idx);
//    console.log(ary);
//     if (idx == 0 || idx == ary.length - 1) {
//          sum += item;
//     }
// });
// console.log(`sum의 값은 ${sum}`);

// array3
// const friends = [{
//     name: '김우진',
//     phone: '010-3213-9898'
// }]; 
// friends.push({
//     name: '박은빈',
//     phone: '010-2241-5454'
// });
// friends.push({
//     name: '최우식',
//     phone: '010-1251-8563'
// })

// let search = prompt('연락처를찾을 친구의 이름을 입력')

// ㄴ
// friends.forEach(function(item, idx, ary) { //배열
//     if(idx == 1) {
//         console.log(`이름은 ${item.name}`);

//     }
// });
// friends.forEach(function(item, idx, ary) {
//     if(item.name == search) {
//         console.log(`이름은 ${item.name}`);

//     }
// });

// data 사원정보
// 1. 급여가 5000 이상의 사원출력. "이름, 급여"
// 2. 남자사원들만 "maleAry"에 출력
// data.forEach(function(item, idx, ary){
//     if (item.salary > 5000) {
//         console.log(item);
//     }  
// });
const maleAry = new Array();
data.forEach(function (item, idx, ary) {
    if (item.gender == 'Male') {
        maleAry.push(item); // 역순은 unshift
    }
});
// sort 정렬.
maleAry.sort(function (a, b) {
    if (a.salary < b.salary) {
        return -1;
    } else {
        return 1;
    }
})
console.log(maleAry);

console.log(['오렌지', '감', '사과', '수박', '당근'].sort()); // sort 배열안의 값을 정렬 .reverse()
console.log([10, 34, 23, 13, 7].sort(function (a, b) {
    if (a < b) {
        return -1;
    } else {
        return 0;
    }
}));