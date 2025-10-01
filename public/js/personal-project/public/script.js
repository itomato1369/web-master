// script.js HTML 폼 자체 동적기능
// 프론트엔드 기능. 클라이언트(브라우저)에서 실행되는 JavaScript 코드
// 여기에 작성된 코드가 server에 작업을 요청하고 그 server가 확인하고 
// DB에 접근하여 처리한 후 그 결과를 클라이언트에게 응답

document.addEventListener('DOMContentLoaded', function () {
    // 성별 '직접입력' 제어 코드
    // 1. 성별 부분의 HTML 요소를 가져옵니다
    const genderRadio = document.getElementsByName("story_gender"); // 성별의 라디오 버튼 3개 가져온다
    const genderOther = document.getElementById("story-gender-other-input"); // 직접 입력을 누르면 나오는 텍스트 칸

    // 2. 성별 라디오 버튼에 Event 추가
    genderRadio.forEach(radio => {
        radio.addEventListener('change', function () {
            // 체크된 라디오 버튼의 값이 "직접입력"인지 확인
            if (this.value === '직접 입력') {
                // '직접 입력'이면 텍스트 칸을 보이게 합니다
                genderOther.style.display = 'block';
                genderOther.required = true; // '직접 입력'을 누르면 텍스트 칸을 필수로 설정
            } else {
                // 남성이나 여성을 선택하면 텍스트 칸을 숨기고, 필수 해제 및 값 초기화
                genderOther.style.display = 'none';
                genderOther.required = false;
                genderOther.value = '';
            }
        });
    });

    // 3. 경품 응모 2PAGE 기능 코드
    const p2Section = document.getElementById("p2-section"); // p2섹션 전체 div
    const applyRadio = document.getElementsByName("gift_apply"); // 경품 응모 여부 라디오 버튼

    // p2Section 의 필수 입력 필드를 배열로 만든다. 
    const p2Inputs = [
        document.getElementById("applicant-name"),
        document.getElementById("applicant-phone"),
        document.getElementById("applicant-email"),
        document.getElementById("applicant-postal"),
        document.getElementById("address-detail")
    ];

    // 경품 응모 여부 라디오 버튼이 변경을 감지한다
    applyRadio.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === '네') {
                // '네' 선택시 p2섹션 보이게하기
                p2Section.style.display = 'block';
                // '네' 선택시 p2 입력필드는 필수
                p2Inputs.forEach(input => {
                    input.required = true;
                });
                // 개인정보 동의를 기본적으로 '동의하지 않음'
                document.getElementById("agree-no").checked = true;
            } else {
                // '아니요' 선택시 기본 폼 태그 유지
                p2Section.style.display = 'none';
                // '아니요' 선택시 p2 입력필드는 초기화 및 해제
                p2Inputs.forEach(input => {
                    input.required = false;
                    input.value = '';
                });
                // 경품 응모 여부를 '아니요' 로 선택했을시 실행되는 뒷정리 코드
                // 이 코드가 실행되는 시점은 사용자가 경품 응모를 '네'로 했다가 '아니요'로 다시 바꿨을 때
                document.getElementById("agree-yes").checked = false;
                document.getElementById("agree-no").checked = false;
            }
        });
    });

    // 4. 유효성 검사 및 폼 제출
    const storyForm = document.getElementById("story-form"); // 폼 전체
    const storyPw = document.getElementById("story-pw"); // 폼 안의 비밀번호 설정
    const storyPwC = document.getElementById("story-pw-confirm"); // 폼 안의 비밀번호 재확인

    // 폼 제출 Event 유효성 검사 실행
    storyForm.addEventListener('submit', function(event) {
        // 유효성 검사를 통과하지 못하면 제출을 못함
        // validateForm() 은 함수 이름임 
        if (!validateForm()) {
            event.preventDefault();
            return; // 검사 실패 시 함수 종료
        }
        // 통과하면 5단계(AJAX 통신)로 넘어갑니다
        // 5단계 시작 위치: 유효성 검사를 통과 했을 때 
        // 이 위치에 AJAX 코드를 작성 
        event.preventDefault();
        // 5. 폼 데이터 수집 및 전송 함수 호출
        const formData = new formData(storyForm);
        const storyData = {};
        formData.forEach((value, key) => {
            storyData[key] = value;
        });
        // 성별 직접입력 값 처리
        const genderOther = document.getElementById("story-gender-other-input");
        if (genderOther.style.display === 'block') {
            storyData['story_gender'] = genderOther.value;
            // 조건확인 '직접 입력'칸이 화면에 보이는 상태인지
            // '직접 입력'을 선택했을 때만 'block'으로 보임
            // 값 덮어쓰기: 폼 데이터 수집 시 'story_gender' 키에 저장된 값은
            // 원래 라디오 버튼의 '직접입력' value ('직접입력')일 수 있습니다.
            // 이것을 사용자가 직접 입력한 텍스트 칸의 실제 값(genderOther.value)으로 덮어씁니다.
        }
        // 데이터를 서버로 전송하는 함수 호출
        sendStoryToServer(storyData);
    });

    // 모든 유효성 검사를 통합하는 메인 함수
    function validateForm() {
        // 검사 실패시 바로 false 
        if (!validatePassword()) {
            return false;
        }
        if (!validateConsent()) {
            return false;
        }
        // 모든 검사를 통과하면 true 반환
        return true;
    }

    // 비밀번호 일치 및 복잡성 검사 함수
    function validatePassword() {
        const pw = storyPw.value;
        const pwComfirm = storyPwC.value;

        // 비밀번호 일치 여부 확인
        if (pw !== pwComfirm) {
            alert('비밀번호와 비밀번화 확인 값이 일치하지 않습니다.');
            storyPwC.focus(); // 불일치한 곳에 커서 이동
            return false;
        }

        // 비밀번호 복잡성 확인(최소 8자, 영문/숫자/특수문자 중 1개 이상)
        // 이 정규표현식은 비밀번호 규칙을 체크하는 표준적인 방법 중 하나입니다.
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,16})/;

        if (!passwordRegex.text(pw) && pw.length > 0) {
            alert('비밀번호는 최소8자, 최대 16자로 영어대소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.');
            storyPw.focus();
            return false;
        }
        return true;
    }

    // 개인정보 동의 최종 검사 함수
    function validateConsett() {
        const applyYes = document.getElementById("apply-yes");
        const agreeNo = document.getElementById("agree-no");

        // 경품 응모를 선택했고
        if (applyYes.checked) {
            // 동의하지 않음 (agree-no)라면 전송을 막습니다/
            if (agreeNo.checked) {
                alert('경품 응모를 위해서는 개인정보 제공에 동의하셔야 합니다.');
                return false; // 실패
            }
        }
        // '아니요' 를 선택했거나 '네'를 선택하고 '동의함'에 체크했다면 통과
        return true;
    }

});