    //  웹브라우저 동일리소스 원칙 CORS 원칙
    //  http://localhost:5500 클라이언트
    console.log("start");
    fetch("http://localhost:3000/emp/ALL/ALL/-1") // 서버
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            result.forEach(item => {
                let tr = makeRow(item);
                document.querySelector('#list').appendChild(tr);
            });
        })
        .catch((err) => console.log(err));

    // Event
    console.log(document.forms);
    document.forms[0].addEventListener('submit', function (e) {
        // 기본기능 차단
        e.preventDefault();
        let eno = document.querySelector('#empno').value;
        let ename = document.querySelector('#ename').value;
        let job = document.querySelector('#job').value;
        let hiredate = document.querySelector('#hiredate').value;
        let deptno = document.querySelector('#deptno').value;

        // json 포맷으로 서버 전달
        fetch("http://localhost:3000/emp", {
                method: "post",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify({
                    eno,
                    ename,
                    job,
                    hiredate,
                    deptno
                }),

            })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            })
            .catch((err) => console.log(err));
    });

    // 조건 검색 Search
    document.querySelector('#actions1 button[type="submit"]')
        .addEventListener('click', function (e) {
            const ename = document.querySelector('#ename1').value || "ALL";
            const job = document.querySelector('#job1').value || "ALL";
            const deptno = document.querySelector('#deptno1').value || "-1";
            let url = `http://localhost:3000/emp/${ename}/${job}/${deptno}`;
            fetch(url)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    document.querySelector('#list').innerHTML = ""; // 기존목록 비우기
                    result.forEach((item) => {
                        let tr = makeRow(item);
                        document.querySelector('#list').appendChild(tr);
                    });
                })
                .catch((err) => console.log(err));
        });

    // 사원정보 => ROW 생성
    function makeRow(employee) {
        let fields = ['EMPNO', 'ENAME', 'JOB', 'SAL','DNAME','DEPTNO'];
        let tr = document.createElement("tr");
        tr.setAttribute("data-eno", employee.EMPNO);
        fields.forEach((field) => {
            let td = document.createElement("td");
            td.innerHTML = employee[field];
            tr.appendChild(td);
        });
        // 삭제버튼
        let btn = document.createElement("button");
        btn.innerHTML = '삭제';
        btn.addEventListener('click', deleteFunc);
        let td = document.createElement("td");
        td.appendChild(btn);
        tr.appendChild(td);
        return tr;
    } // end of makeRow


    // 삭제버튼 클릭시 실행할 이벤트 핸들러
    function deleteFunc(e) {
        let thisTr = this.parentElement.parentElement;
        let eno = this.parentElement.parentElement.dataset.eno;
        fetch("http://localhost:3000/emp/" + eno)
            .then((response) => response.json())
            .then((result) => {
                if (result.rowsAffected) {
                    alert('성공');
                    thisTr.remove();
                } else {
                    alert('실패');
                }
            })
            .catch(err => console.log(err));
    }