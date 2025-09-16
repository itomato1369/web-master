// object.js 객체

// let obj = {
//     name: '김동우',
//     age: 25,
//     showInfo: function() {
//         return `이름은 ${obj.name}, 나이는 ${obj.age}`;
//     } 
// }
// console.log(obj.showInfo());
// console.log(window)

// dom.js
// createElement(); 요소생성
// appendChild(); 부모-자식관계
// innerText, innterHTML, textContent
let students = [{ // 배열
    stdNo: 100,
    stdName: '김동우', // 속성(property), 객체 값
    score: 80
}, {
    stdNo: 200,
    stdName: '김민기',
    score: 70
}];
// 학생정보 지정. students.length
// prop 속성값을 다 가져온다
for (let prop in students[0]) {
    console.log(prop, students[0][prop]);
}

document.querySelector('#addBtn')
    .addEventListener('click', function () {
    const newElement = {
        stdNo: document.querySelector('#student_no').value,
        stdName: document.querySelector('#student_name').value,
        score: document.querySelector('#score').value,
    }
    let tr = makeTr(newElement);
    document.querySelector('#list tbody').appendChild(tr);
});

function createStdList() {
    for (let i = 0; i < students.length; i++) {
        let tr = makeTr(students[i]);
        document.querySelector('#list tbody').appendChild(tr);
    }
    createStdList();
}

function makeTr(newElement) {
    console.log(newElement);

    let tr = document.createElement('tr'); // <tr></tr>
    for (let prop in newElement) {
        let td = document.createElement('td'); // <td></td>
        td.innerHTML = newElement[prop]; // <td>100</td>
        tr.appendChild(td); // <tr><td>100</td></tr>
    }
    // 삭제버튼.
    let td = document.createElement('td');
    let btn = document.createElement('button');
    btn.addEventListener('click', function (e) {
        e.target.parentElement.parentElement.remove();
    });
    btn.setAttribute('class', 'btn btn-danger'); // <button id="addBtn" class="btn btn-danger">
    btn.innerHTML = '삭제';
    td.appendChild(btn);
    tr.appendChild(td);
    return tr; 
}

//      document.querySelector('#list tbody').appendChild(tr);
//  
// createStdList();

//  let td = document.createElement('td'); // <td></td>
//         td.innerHTML = students[i].stdNo; // <td>100</td>
//         tr.appendChild(td); // <tr><td>학생번호</td></tr>
//         // 이름.
//         td = document.createElement('td');
//         td.innerHTML = students[i].stdName;
//         tr.appendChild(td); // <tr><td>이름</td></tr>
//         // 점수.
//         td = document.createElement('td');
//         td.innerHTML = students[i].stdName;
//         tr.appendChild(td); // <tr><td>점수</td></tr>