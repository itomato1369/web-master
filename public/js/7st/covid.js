// covid.js
const url = `https://api.odcloud.kr/api/15077586/v1/centers?page=1&perPage=284&serviceKey=e9fa5cdfd473f253714d3accc3cee7d5b2be3b32628c4a2bca6acf248cdb4821`;

let total = []; // 전체 센터 목록 
// 목록. 
fetch(url)
    .then(resp => resp.json()) // json 포맷 -> 자바스크립트객체.ㄴ
    .then(result => {
        total = result.data;
        showPageList(1);
        // total.filter(item => item.id <= 10)
        //     .forEach((center) => {
        //         // console.log(center);
        //         let tr = makeRow(center);
        //         document.querySelector('#centerList').appendChild(tr);
        //     });
        // console.log(result.data[0]);
    })
    .catch(err => console.log(err));


// 권수에 따라 페이징 목록 => 1,2,3,...,28

function makePagingList() {
    const paging = {
        currPage: 1,
        startPage: 1,
        endPage: 10,
        prev: false,
        next: false,
        initPage(page = 1, totalCnt = 284) {
            let realEnd = Math.ceil(totalCnt / 10)
            this.currPage = page;
            this.endPage = Math.ceil(page / 10) * 10;
            this.startPage = this.endPage - 9;
            this.prev = this.startPage == 1 ? false : true; // 이전 10개 페이징 존재여부
            // this.next = this.end > realEnd ? realEnd : this.end; // 이후 10개 페이징 존재여부
            this.next = this.end < realEnd ? false : true; // 
        },
    };
    paging.initPage(10);
    console.log(paging);
    // ul target
    let target = document.querySelector('ul.pagination');
    target.innerHTML = '';
    // 이전 페이징 생성
    if (paging.prev) {
        let li = document.createElement('li');
        li.className = 'page-item';
        let a = document.createElement('a');
        a.innerText = 'Previous';
        a.className = 'page-link';
        a.setAttribute('href','#');
        li.appendChild(a);
        target.appendChild(li);
    } else {
        let li = document.createElement('li');
        li.className = 'page-item disabled';
        let a = document.createElement('a');
        a.innerText = 'Previous';
        a.className = 'page-link';
        li.appendChild(a);
        target.appendChild(li);
    }

    // 페이징생성
    for (let s = paging.startPage; s <= paging.endPage; s++) {
        let li = document.createElement('li');
        li.className = 'page-item';
        let a = document.createElement('a');
        a.innerText = s;
        a.className = 'page-link';
        a.setAttribute('href', '#');
        li.appendChild(a);
        target.appendChild(li);
    }
        // 이후 페이징 생성
        if (paging.next) {
        let li = document.createElement('li');
        li.className = 'page-item';
        let a = document.createElement('a');
        a.innerText = 'Next';
        a.className = 'page-link';
        a.setAttribute('href','#');
        li.appendChild(a);
        target.appendChild(li);
    } else {
        let li = document.createElement('li');
        li.className = 'page-item disabled';
        let a = document.createElement('a');
        a.innerText = 'Next';
        a.className = 'page-link';
        li.appendChild(a);
        target.appendChild(li);
    }

    // 링크 이벤트 생성
    pageLinkEvent();
}
makePagingList();

// 화면의 a 태그에 링크 생성
function pageLinkEvent() {
    document.querySelectorAll('a.page-link').forEach(item => {
        // a 태그 모두 가져오니까 All
        // 이벤트 등록
        item.addEventListener('click', function (e) {
            e.preventDefault(); // 기본 기능 차단
            let page = item.innerHTML;
            showPageList(page);
        });
    });
}
pageLinkEvent();

// 페이지 목록 
function showPageList(page = 1) {
    // tbody 값을 초기화
    document.querySelector('#centerList').innerHTML = '';
    let start = (page - 1) * 10
    let end = page * 10;
    total
        .filter(item => item.id > start && item.id <= end)
        .forEach((center) => {
            let tr = makeRow(center);
            document.querySelector('#centerList').appendChild(tr);
        });
}
makePagingList();

// center -> 화면에 한건 출력
function makeRow(center) {
    const fields = ['id', 'centerName', 'address', 'sido'];
    let tr = document.createElement('tr');
    for (let field of fields) {
        let td = document.createElement('td');
        td.innerHTML = center[field];
        tr.appendChild(td)
    }
    return tr;
}