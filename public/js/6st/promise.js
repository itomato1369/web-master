//  promise.js
//  콜백함수 -> 순차적으로
//  매개값을 함수
function callFnc(x1 = 0, x2 = 0, anonymousFnc) {
    return anonymousFnc(x1, x2);
}
let result = callFnc(10, 20, function (a, b) {
    return a * b;
});
console.log(result);

const promise = new Promise(function (resolve, reject) {
    reject('NG');
    resolve('OK');
}); // new Object()

promise.then(function (response) {
        console.log(response);

    })
    .then(function(result) {
        console.log(result);
    })
    .catch(function (err) {
        console.log(err);
    });