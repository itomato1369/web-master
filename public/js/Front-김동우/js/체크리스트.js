let btn = document.querySelector('.addBtn');
btn.addEventListener('click', () => {
    let input = document.querySelector('#item').value;
    console.log(input);
    if (input == '') {
        alert('값을 입력하세요');
        return;
    } else {
        addToList(input);
    }
});
function addToList(input) {
    let ul = document.getElementById('tCheck');
    let li = document.createElement('li');
    li. addEventListener('click', (e) => {
        console.log(e.target);
    });
    let span = document.createElement('span');
    li.innerHTML = input;
    span.classList.add('close');
    span.innerHTML = 'X';
    span.addEventListener('click', (e) => {
        e.stopPropagation();
        e.target.parentElement.remove();
    });
    li.appendChild(span);
    ul.appendChild(li);
};

