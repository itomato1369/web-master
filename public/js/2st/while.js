// while.js 
// 반복문. 
// whie(true) 는 무한반복

// // 1 ~ 10까지 콘솔출력.
let i = 1;
while (i <= 10) {
    console.log(`현재 i의 값은 => ${i}`);
    i++;
}
// 조건을 만족할 동안만 실행.
while (true) {
    let rv = parseInt(Math.random() * 10);
    console.log(`임의의 값 => ${rv}`);
    if (rv == 0) {
        break;
    }
}
console.log(`end of prog.`);

// while2.js
// 학생점수를 입력 => while 반복을 활용해서 입력받은 학생의 총점수 구하기. // 학생점수의 평균. 총합/인원 
//정수면 0;
let sum = 0;
let count = 0;
let userValue;

while (true) {
    userValue = prompt("학생점수를 입력하세요. 종료하려면 exit");
    if (userValue == "exit") {
        console.log(`${sum}`);
        break;
    } else {
        // sum += parseInt(userValue);
        sum = sum + parseInt(userValue);
        count++;
    }
}
console.log(`학생의 총점은 ${sum}, 학생의 평균은 ${sum/count}`);