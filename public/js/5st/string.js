// string.js 문자열
// ` 백틱으로 문자열 선언  간단한 연산식도 포함
// let name = 'Hong';
// let age = 73;
// let result = ' ';
// let obj = {
//     name: '고길동',
//     bt: 'b',
//     show() {
//         return this.name + this.bt;
//     }
// };

// if (age > 20) {
//     result = '성인';
// } else {
//     result = '미성년';
// }

// result = age >= 20 ? '성인' : '미성년'; // 조건을 만족하면 ? 뒤의 값 아니면 : 뒤의 값

// console.log(`이름은 ${name == 'Hong'}, ${ age >= 20 ? '성인' : '미성년'}`);
// console.log(`${result}`);


// // indexOf() 매개값의 위치를 찾고 index 값을 구함
// let idx = 'Hello, World'.indexOf('W'); //
// console.log(idx);
// idx = "김선태, 충주맨, 컴퓨터".indexOf("");
// console.log(idx);

// let myFriends = ['김선태', '충주맨', '컴퓨터'];
// myFriends.forEach((item, idx, ary) => {
//     if (item.indexOf('컴') == 0) {
//         console.log(item);
//     }
// });

// slice() 지정된 부분을 새 문자열로
// console.log('pizza, orange, cereals'.slice(0, 5).toUpperCase()); // 0부터 5값 까지만 남기고 다 자르겠다
// console.log('pizza, orange, cereals'.slice(-7).toLowerCase()); // 

// // charAt()
// console.log("Hello, World".charAt(7));

// // replace()
// console.log("Hello, World".replace("W","w")); // replace(찾을 값, 바꿀값)

// // trim()
// console.log("            He  llo, Wor     ld".trim());

// const code = "AGCDEFG";
// console.log(code.startsWith("ABB"));
// console.log(code.startsWith("agc"));
// console.log(code.startsWith("AGC"));

// const code = "ABCDEFGHI";
// console.log(code.startsWith("B", 1)); // 3개 문자를 지나 검사한다

// const code = "ABCDEF";
// console.log(code.endsWith("DDD"));   // 문자열이 어떻게 끝나느냐
// console.log(code.endsWith("DEF"));   // 문자열이 어떻게 끝나느냐
// console.log(code.endsWith("E", 5));   // 문자열이 어떻게 끝나느냐

// const code = "ABCDEF";
// console.log(code.includes("AB"));
// console.log(code.includes("a"));
// console.log(code.includes("CDE"));

// let hello = "Hi";
// console.log(hello.repeat(12)); // 몇 번 반복할거냐

function getGender(no) {
    //  주민번호의 성별 뒷자리 중 첫번째 값
    if (no.length == 13) {
        
    }




};


const numAry = ['990101-1235464', '010322-3234531', '9830423456721'];
numAry.forEach((item) => {
    console.log('성별은 ' + getGender(item));
});

// const names = ['Alice','Bob','Charlie'];
// names.forEach((name) => {
//     console.log('Hello ' + name);
// });



function getId(mail) {
    // 메일 주소에서 아이디 부분을 반환
    let pos = mail.indexOf('@');
    mail.substring(0, pos);

    

}

const emails = [
    'idubarr@oracle.com',
    'wldiwwlxl@samsung.com',
    'hiword@sksksks.com',
    'usetuser1@bababa.com'
    // @의 앞의 값을 가져오면 아이디 부분
];
emails.forEach((item) => {

});

