// calendar.js    기본 달력 만들기
// let tr = document.createElement('tr');
// for (let d = 1; d <= 31; d++) {
//     let td = document.createElement('td');
//     td.innerHTML = d;
//     tr.appendChild(td);
//     if(d % 7 == 0) {
//         tr = document.createElement('tr');
//     }
//     document.querySelector('tbody').appendChild(tr);
// }

//  달력의 1일의 위치.   달력보면 생기는 공란 만드는 법.
// let spaces = 0; // 공란의 갯수.
// let tr = document.createElement('tr');
// for (let d = 1; d <= 31; d++) {
//     let td = document.createElement('td');
//     td.innerHTML = d;
//     tr.appendChild(td);
//     if(d % 7 == 0) {
//         tr = document.createElement('tr');
//     }
//     document.querySelector('tbody').appendChild(tr);
// }
// for (let s = 0; s < spaces; s++) {
//     let td = document.createElement('td');
//     tr.appendChild(td);
// }

// let yyyy = 2025,
//     mm = 9;
// let holidays = [15, 24]

// let today = new Date();
// today.setFullYear(yyyy);
// today.setMonth(mm - 1);
// today.setDate(1);

// let spaces = today.getDay();

// today.setMonth(mm);
// let lastDate = new Date(today.getTime() - (1000 * 60 * 60 * 24));
// lastDate = lastDate.getDate();

// let caption = document.createElement('caption');
// caption.innerHTML = `${yyyy}년/ ${mm}월`

// let tr = document.createElement('tr');
// for (let s = 0; s < spaces; s++) {
//     let td = document.createElement('td');
//     tr.appendChild(td);
// }
// for (let d = 1; d <= lastDate; d++) {
//     let td = document.createElement('td');
//     td.innerHTML = d;
//     tr.appendChild(td);
//     if ((d + spaces) % 7 == 0) {
//         td.setAttribute('class', 'saturday');
//         document.querySelector('tbody').appendChild(tr);
//         tr = document.createElement('tr');
//     } else if ((d + spaces) % 7 == 1) {
//          td.setAttribute('class', 'sunday');
//     }
// }
// document.querySelector('tbody').appendChild(tr);


// setInterval
document.querySelector('table').remove();

let str = `Lorem dolores!`;
let strAry = str.split(' '); // 공백을 기준으로 문자열 배열로 생성.
const outer = document.querySelector('div.outer');
strAry.forEach(function (item, idx, ary) {
    let div = document.createElement("div");
    div.innerText = item;
    div.setAttribute('class', 'inner');
    outer.appendChild(div);
    // console.log(div.innerText);
    // console.log(div.setAttribute('class','inner'));
    // console.log(outer.appendChild(div));
});

document.querySelector('#search_word').addEventListener('click', function (item) {
    let search = document.querySelector('#user_value').value;
    document.querySelectorAll('div.inner').forEach(function (item) {
        if (item.innerHTML == search){
            item.remove();
        }
    });
});

document.querySelector('#search_word').addEventListener('click', function (item) {
    let search = document.querySelector('#user_value').value;
    if (item.innerHTML == search) {
        item.remove();
    }

    let is_exist = false;
    document.querySelectorAll('div.inner').forEach(function (item){
        if (item.innerHTML == search) {
            item.remove();
            is_exist = true;
        }
    });
    if(is_exist) {
        alert('같은 값이 있습니다');
    } else {
        alert('찾는 값이 없습니다');
    }
    document.querySelector('#user_value').value = ' ';
    console.log(document.querySelectorAll('div.inner').length);
});
// alert('성공') alert('실패');


let timing = 60;
setInterval(function () {
    console.log(timing--);
},1000);

    
