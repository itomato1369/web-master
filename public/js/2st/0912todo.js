//0912 과제

// 2개의 값을 입력받도록... 화면구성(html)
// 계산하는 기능 구현 사칙연산
// 함수 이름 정의 plus, minus, multiply, divide
//
// document.querySelector('#') 은 #앞에 붙은 주소를 찾는 것


function calculate() {
    let num1 = document.querySelector("#num1").value;
    let num2 = document.querySelector("#num2").value;
    let operation = document.querySelector("#operation").value;
    let result = 0;
    console.log(num1, num2, operation);
    switch (operation) {
        case 'plus':
            result = num1 + num2; break;
        case 'minus':
            result = num1 - num2; break;
        case 'multiply':
            result = num1 * num2; break;
        case 'divide':
            result = num1 / num2; break;
    }
    document.querySelector('#result').value = result;
}
