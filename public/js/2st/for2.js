// for2.js
// 조건문 추가.

// sum += 1; 둘 다 똑같다 sum = sum + 1;
// sum++; 1씩 증가  / <= i는 시작지점

// 1 ~ 100 값 중에서 3의 배수 (3으로 나눠서 나머지가 0)의 합을 구하도록.
let sum = 0;
for (let i = 1; i <= 100; i++) {
    if (i % 3 == 0) {
        sum += i;
    }
}
console.log(`3의 배수의 합은 => ${sum}`);

// 1 ~ 100 까지의 숫자중에서 2의 배수, 3의 배수 => 각각 저장.
let even = 0;
let odd = 0;
for (let i = 1; i <= 100; i++) {
    if (i % 2 == 0) {
        even += i;
    }
    if (i % 3 == 0) {
        odd += i;
    }
}
console.log(`2의 배수의 합은 ${even}, 3의 배수의 합은 ${odd}`);

// 1 ~ 10 까지의 합 => 합이 30보다 크면 출력하도록.
sum = 0;
for (let i = 1; i < 10; i++) {
    sum += i;
    if (sum >= 30) {
        console.log(`현재 i의 값은 => ${i}, sum은 ${sum}`);
    }
}

for (let i = 1; i <= 10; i++) {
    //짝수일 경우에만 출력.
    if (i % 2 == 1) {
        console.log(`현재 i의 값은 => ${i}`);
    }
}

let ran = 0;
// 1 ~ 10까지만 범위. 2의 배수, 3의 배수 => 합
for (let i = 1; i <= 100; i++) {
    let ran = parseInt(Math.random() * 10) + 1;
    if (ran % 2 == 0) {
        even += ran;
    }
    if (ran % 3 == 0) {
        odd += ran;
    }
}
console.log(`2의 배수의 합은 ${even} 3의 배수의 합은 ${odd}`);

//반복 -1부터 10번
// for (let i = -1; i < 10; i++){
// }