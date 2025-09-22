// spread.js
// 배열도 object 객체.
const veggie = ['tomato','cucumber','beans']; //...veggie 내용을 펼치겠다
// console.log(...veggie);
// console.log(veggie);
const newVeggie = veggie;  // 객체의 주소 동일

// 원시 데이터 타입
// let fruit = 'apple';
// let newFruit = fruit;
// newFruit += ',mango';  // 기본 값에다가 넣어 주겠다 +=
// console.log(fruit, newFruit);



newVeggie.push('peas');
console.log(veggie, newVeggie); // 같은 배열을 참조.
const anotherVeggie = [...veggie,...['grape']]; //[] 새로운 배열
veggie.push('peanuts');
console.log(veggie, anotherVeggie);

// 펼침연산자.
function sum(...num) {
    let result = 0;
    for (let n of num) {
        result += n;
    }
    return result;
};
console.log(sum(1,2,3,4,5,6));

//
const myFriend = {
    name: 'Hong',
    age: 20,
};
const yourFriend = myFriend; // heap 메모리의 주소 참조
myFriend.age = 22;

const anFriend = {...myFriend}; // 새로운 객체를 생성 {}안의 값만 가져옴
myFriend.name = 'Hwang';

console.log(myFriend, anFriend);