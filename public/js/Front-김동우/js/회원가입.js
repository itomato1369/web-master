document.querySelector('#buttons').children[0].addEventListener('click', function () {
        let userId = document.getElementById('user-id').value; // 값을 가져옴
        let userPw = document.getElementById('user-pw1').value;
        let userPw2 = document.getElementById('user-pw2').value;

        if (userId.length < 3 || userId.length > 16) { // 4글자 이상 15자리 이하
            alert('아이디는 4글자 이상 15자리 이하로 입력해주세요');
            document.getElementById('user-id').focus();
        } else if (userPw.length < 7) { // 8자리 이상
            alert('비밀번호 8자리 이상 입력해주세요');
            document.getElementById('user-pw1').focus();
        } else if (userPw !== userPw2) {
            alert('비밀번호 다름');
        } else {
            console.log("통과");
        }
    });


// pw1 pw2 일치 하는지
// function pwCheck() {
//     pw = document.getElementById('user-pw1');
//     confirm = document.getElementById('user-pw2');
//     if(pw.value !== confirm.value) {
//         alert('비밀번호를 확인해 주세요');
//         pw.value = '';
//         confirm.value = '';
//         pw.focus();
//     }
// }