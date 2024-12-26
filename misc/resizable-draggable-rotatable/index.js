let textBox = {
    dom: null,
    x: null,
    y: null
}

let cursor = {
    x: null,
    y: null
}

document.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('box')) {
    // if (event.target.tagName === 'TEXTAREA') {
        event.preventDefault();
        cursor = {
            x: event.clientX,
            y: event.clientY
        }

        textBox = {
            dom: event.target,
            x: event.target.getBoundingClientRect().left,
            y: event.target.getBoundingClientRect().top
        };
    }
});

document.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('dot')) {
        event.target.style.cursor = 'grab';
    }
});


document.addEventListener('mousemove', (event) => {
    if (textBox.dom === null) {
        return;
    }

    let currentCursor = {
        x: event.clientX,
        y: event.clientY
    };

    let distance = {
        x: currentCursor.x - cursor.x,
        y: currentCursor.y - cursor.y,
    };

    textBox.dom.style.left = (textBox.x + distance.x) + 'px';
    textBox.dom.style.top = (textBox.y + distance.y) + 'px';
});

document.addEventListener('mouseup', () => {
    textBox.dom = null;
    stopDrag()
});



let size = {
    w: 200,
    h: 100
};

let lastSize = {
    w: null,
    h: null
}
let minSize = {
    w: 170,
    h: 70
}

let position = {
    x: 660,
    y: 100
}

let lastPosition = {
    x: null,
    y: null
};

let box = document.getElementsByClassName('box')[0];
box.style.width = size.w + 'px';
box.style.height = size.h + 'px'
box.style.left = `${position.x}px`
box.style.top = `${position.y}px`



const resizeAnchorType = 'top' | 'left' | 'bottom' | 'right';
const resizeDirectionType = 'x' | 'y' | 'xy';

let currentDot = null;
let isResizeable = false;
function startResize(event) {
    currentCursor = {
        x: event.clientX,
        y: event.clientY
    }
    currentDot = event.target
    isResizeable = true;
    document.addEventListener('mousemove', onDrag);
}

function onDrag(event) {
    event.preventDefault();
    if (currentDot === null) {
        return;
    }

    const directions = {
        'top-left': { dirX: -1, dirY: -1, adjustX: true, adjustY: true },
        //khi kéo về phía bên trái width tăng, left giảm => trục x có thay đổi, dx = -1 * movementX(âm khi duy chuyển về bên trái) = dương => width tăng
        //khi kéo về phía bên phải width giảm, left tằng => trục x có thay đổi

        'top-right': { dirX: 1, dirY: -1, adjustX: true, adjustY: true },
        'bottom-left': { dirX: -1, dirY: 1, adjustX: true, adjustY: true},
        'bottom-right': { dirX: 1, dirY: 1, adjustX: true, adjustY: true },
        'top-center': { dirX: 0, dirY: -1, adjustX: false, adjustY: true },
        'bottom-center': { dirX: 0, dirY: 1, adjustX: false, adjustY: true},
        'left-center': { dirX: -1, dirY: 0, adjustX: true, adjustY: false },
        'right-center': { dirX: 1, dirY: 0, adjustX: true, adjustY: false },
    };
    const rect = box.getBoundingClientRect();
    const dx = event.movementX;
    const dy = event.movementY;
    const direction = Object.keys(directions).find(dir => currentDot.classList.contains(dir));
    if (direction) {
        const { dirX, dirY, adjustX, adjustY } = directions[direction];
        console.log({ dirX, dirY, adjustX, adjustY })
        if (adjustX) {
            const newWidth = rect.width + dirX * dx;
            if (newWidth >= minSize.w) {
                box.style.width = `${newWidth}px`;
                if (dirX === -1) {
                    box.style.left = `${rect.left + dx}px`;
                }
            }
        }
        if (adjustY) {
            const newHeight = rect.height + dirY * dy;
            if (newHeight >= minSize.h) {
                box.style.height = `${newHeight}px`;
                if (dirY === -1) box.style.top = `${rect.top + dy}px`;
            }
        }
    }

}


function stopDrag(event) {
    isResizeable = false;
    currentDot = null;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
}
let dots = document.getElementsByClassName('dot');

for (let dot of dots) {
    dot.addEventListener('mousedown', startResize);
}
