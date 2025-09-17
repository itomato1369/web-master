// json.js 문자열

const xhtp = new XMLHttpRequest();
xhtp.open('GET', 'data.json'); // 서버의 요청할 페이지 지정.
xhtp.send(); // 실제 요청

xhtp.onload = function () {
    let data = JSON.parse(xhtp.responseText); //콘솔확인 해보기
    console.log(data);
    let fields = ['id', 'first_name', 'last_name', 'gender', 'salary']
    data.forEach(function (item, idx, ary) {
        for (let i = 0; i < fields.length; i++) {
            let td = document.createElement('td');
            td.innerHTML = item[fields[i]];
            true.appendChild(td);
        }
        document.querySelector('#list').appendChild(tr);
    })
}