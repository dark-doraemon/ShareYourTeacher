let color = document.getElementById('color');
let createBtn = document.getElementById('createBtn');
let list = document.getElementById('list');

createBtn.addEventListener('click', () => {
    let newNode = document.createElement('div');
    newNode.classList.add('note');
    newNode.innerHTML = `
        <span class="close">x</span>
        <textarea placeholder="Write Content..." rows="10"></textarea>
    `
    newNode.style.borderColor = color.value
    list.appendChild(newNode);
})

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('close')) {
        // list.removeChild(event.target.parentElement)
        event.target.parentElement.remove();
    }
});


let cursor = {
    x: null,
    x: null
};

let note = {
    dom: null,
    x: null,
    y: null
};


document.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('note')) {
        cursor = {
            x: event.clientX,
            y: event.clientY
        }
        note = {
            dom: event.target,
            x: event.target.getBoundingClientRect().left,//lấy css left
            y: event.target.getBoundingClientRect().top,// lấy css top
        }
    }
});


document.addEventListener('mousemove', (event) => {
    if(event.target.classList.contains('note'))
    {
        event.target.style.cursor = 'grab'
    }
    if (note.dom === null) {
        return;
    }
    //khi mouse move ta lấy vị trí con trỏ chuột mới
    let currentCursor = {
        x: event.clientX,
        y: event.clientY
    }

    let distance = {
        x: currentCursor.x - cursor.x,
        y: currentCursor.y - cursor.y
    }

    note.dom.style.left = (note.x + distance.x) + 'px';
    note.dom.style.top = (note.y + distance.y) + 'px';
    note.dom.style.cursor = 'grab'
});


document.addEventListener('mouseup', (event) => {
    if (note.dom === null) {
        return;
    }
    note.dom.style.cursor = 'auto';
    note.dom = null;
});
