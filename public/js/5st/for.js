// for 반복문 for of for in
// for of 배열의 값을 반환
let numAry = [10, 20, 30, 40, 50];
let sum = 0;
for (let num of numAry) {
    sum += num;
    console.log(sum);
}

// for in 키의 목록을 반환
let student = {
    sno: 100,
    sname: 'abc',
    score: 123,
};

for (let key in student) {
    console.log(key, student[key]);
}