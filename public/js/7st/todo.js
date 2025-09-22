let btn = document.querySelector('.addBtn');
btn.addEventListener('click', () => {
    let input = document.querySelector('#myInput').value;
    console.log(input);
    if (input == '') {
        return;
    } else {
        addToList(input);
    }
});

function addToList(input) {
    let ul = document.querySelector('#myUL');
    // console.log(`ul태그는 ${ul}`);
    console.log(`ul태그는`, ul);
    let li = document.createElement('li');
    li.addEventListener('click', (e) => {
        console.log(e.target);
    });
    let span = document.createElement('span');

    li.innerHTML = input;
    span.classList.add('close');
    span.innerHTML = 'X';
    span.addEventListener('click', (e) => {
        e.stopPropagation();
        e.target.parentElement .remove();
    });
    li.appendChild(span);

    ul.appendChild(li);
};

function addToList() {
    let txt = document.getElementById('myInput').value;
    let cloned = document.querySelector('#myUL>li').cloneNode(true); // 복제
    let spand = cloned.querySelector('span');
    cloned.className = '';
    cloned.classList.remove('checked'); // 클래스 목록에서 ()만 추가는 add
    cloned.innerHTML = txt;
    cloned.appendChild(spand);
    spand.addEventListener('click', (e) => {
        e.target.parentElement.remove();
    });

    cloned.addEventListener();

    document.querySelector('#myUL').appendChild(cloned);
}

document.querySelectorAll('#myUL > li').forEach((item, index, ary) => {
    item.addEventListener('click',() => {
        if (item.className == 'checked') {
            item.className = '';
        }
        else{
            item.className == 'checked';
        }
    });
    console.log(item)
    item.children[0].addEventListener('click', (e) => {
        e.target.parentElement.remove();
    });
});