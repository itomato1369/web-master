// for.js
// 반복문.

let sum = 0;

sum = sum + 1; // sum(1) = sum(0) + 1;
sum = sum + 2; // sum(3) = sum(1) + 2;
sum = sum + 3; // sum(6) = sum(3) + 3;
//.... 
sum = sum + 10;

// for구문.   ; 은 문장의 끝
// console.log('sum:' + sum +', i: ' + i);      `백틱은 기능이 많아서 쓴다.  '작은 따옴표
// ${} 변수를 가져올 때  합침
// for (let i = 1; i <= 9; i = i + 1) {}
// console.log(`sum: ${sum}, i: ${i} => sum: ${sum + i}`);   
// console.log(`3 * ${i} = ${3 * i}`);

document.writeln(`<table class= "table table-striped">`);
document.writeln(`<thead>
                    <tr>
                      <th>단수</th><th></th><th>배수</th><th></th><th>결과</th>
                    <tr>
                    </thead>
                    <tbody>`);
for (let i = 1; i <= 9; i = i + 1) {
    document.writeln(`<tr>
                        <td> 3 </td>
                        <td> * </td>
                        <td> ${i} </td>
                        <td> = </td>
                        <td> ${3 * i} </td>
                    </tr>`);
}
document.writeln(`</tbody></table>`);