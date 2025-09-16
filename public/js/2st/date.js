// date.js
// 배열 [] 객체 {}
const now = new Date(); //현재 날짜와 시간을 가진 새로운 Date객체
console.log(now.toLocaleDateString() + now.toLocaleTimeString());
console.log(now.toLocaleTimeString());

let today = new Date('2025-09-16 10:30:30'); // 문자열
today.setFullYear(2024);
today.setMonth(8);
console.log(today.toLocaleDateString() + today.toLocaleTimeString());

console.log(today.getFullYear()); // 숫자
console.log('월:' + (today.getMonth()+ 1)); // 0,1,2,...11 0이 1월 그래서 +1을 함
console.log('일:' + today.getDate()); // 숫자
console.log('요일:' + today.getDay()); // 0,1,2,3,4,5,6  0이 일요일




// 날짜 입력 하면 '2025-11-12' => 요일정보를 반환해주는 함수.
function translateDay(dateStr) {  //date는 날짜 Str은 String 문자열
    let dayAry = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일']
    // 날짜를 요일로
    let today = new Date(dateStr);
    let day = today.getDay(); 
    return dateStr + '은' + dayAry[day] + '입니다';
}
console.log(translateDay('2025-10-01'));