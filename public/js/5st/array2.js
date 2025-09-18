// array.js
const xhtp = new XMLHttpRequest();
xhtp.open('get','../4st/data.json');
xhtp.send();

xhtp.onload = function () {
    console.log(JSON.parse(xhtp.responseText));
    const employees = JSON.parse(xhtp.responseText);
    employees.filter((item) => item.gender == "Female")
    .map(({id, first_name, last_name, salary}) => ({id, name:`${last_name} ${first_name}`, salary}))
    .forEach((item) => console.log(`사번: ${item.id}, 이름: ${item.name}, 급여: ${item.salary}`));
   
};
xhtp.onload = function () {
    const review = JSON.parse(xhtp.responseText);
    review.filter((item) => {item.gender == "Female"})
}



 // filter, map => 여자사원 => 사번, 이름, 급여



//  gender 중에서 여자사원만
// 여자사원의 id 가져오고 
// 여자사원의 first_name + last_name 
// 여자사원의 salary가져온다



// const user = names.map((item) => {
//     let {id, first_name, last_name, gender, salary} = item;
//     let userPass = 
//      {id, first_name, last_name, gender, salary};
// });

