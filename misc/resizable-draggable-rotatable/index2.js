const box = document.querySelector('.box');
const textarea = box.querySelector('textarea');
const rotateLine = box.querySelector('.rotate-line');
const createBtn = document.getElementById('createBtn');
let isDragging = false;
let isResizing = false;
let isRotating = false;
let currentResizer;
let startX, startY, startWidth, startHeight, startLeft, startTop;
let currentRotation = 0;

const sizeLimit = {
    minWidth: 200,
    minHeight: 100,
    maxWidth: window.innerWidth - 10,
    maxHeight: window.innerHeight - 10,
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(0,0);
ctx.lineTo(200,100);
ctx.stroke();


function checkTextareaContent() {
    if (textarea.value.trim() === '') {
        if (box.style.border === 'none' || box.style.border === '') {
            textarea.style.border = '1px solid #ccc';
        }
    }
    else {
        textarea.style.border = 'none';
    }
}

// Kiểm tra mỗi khi người dùng thay đổi nội dung trong textarea
textarea.addEventListener('input', checkTextareaContent);

checkTextareaContent();
// Di chuyển box
box.addEventListener('mousedown', function (e) {
    if (e.target === box || e.target.tagName === 'TEXTAREA') {

        //xuất hiện border và dot
        textarea.style.border = 'none'
        resizers.forEach(resizer => {
            resizer.style.display = 'inline'
        })
        box.style.border = "2px solid #333"
        rotateLine.style.display = 'inline';
        rotateHandle.style.display = 'inline';
        isDragging = true;
        startX = e.clientX - box.offsetLeft;
        startY = e.clientY - box.offsetTop;
    }

});

document.addEventListener('mousedown', (event) => {
    if (event.target === box || event.target.tagName === "TEXTAREA") {

    }
    else {
        resizers.forEach(resizer => {
            resizer.style.display = 'none'
        });
        box.style.border = 'none'
        rotateLine.style.display = 'none';
        rotateHandle.style.display = 'none';
        checkTextareaContent();
    }
});

// Xoay box
const rotateHandle = document.querySelector('.rotate-handle');
rotateHandle.addEventListener('mousedown', function (e) {
    isRotating = true;
    const boxRect = box.getBoundingClientRect();
    //lưu khoảng cách từ mép trái và mép trên của màn hình tới tâm của box
    const boxCenter = {
        x: boxRect.left + boxRect.width / 2,
        y: boxRect.top + boxRect.height / 2
    };
    const angle = Math.atan2(e.clientY - boxCenter.y, e.clientX - boxCenter.x);
    startRotation = angle - currentRotation;
    e.stopPropagation();
});

// Điều chỉnh kích thước box
const resizers = document.querySelectorAll('.dot');
resizers.forEach(resizer => {
    resizer.addEventListener('mousedown', function (e) {
        isResizing = true;
        currentResizer = e.target;
        startX = e.clientX;
        startY = e.clientY;
        // startWidth = parseFloat(getComputedStyle(box).width);
        // startHeight = parseFloat(getComputedStyle(box).height);
        startWidth = box.getBoundingClientRect().width;
        startHeight = box.getBoundingClientRect().height;
        startLeft = box.getBoundingClientRect().left;
        startTop = box.getBoundingClientRect().top;
        e.stopPropagation();
    });
});

function clamp(value, min, max) {
   return Math.min(Math.max(value, min), max);
}


document.addEventListener('mousemove', function (e) {
    if (isDragging) {
        e.preventDefault();
        box.style.left = (e.clientX - startX) + 'px';
        box.style.top = (e.clientY - startY) + 'px';
    }

    if (isRotating) {
        e.preventDefault();
        const boxRect = box.getBoundingClientRect();
        const boxCenter = {
            x: boxRect.left + boxRect.width / 2,
            y: boxRect.top + boxRect.height / 2
        };
        const angle = Math.atan2(e.clientY - boxCenter.y, e.clientX - boxCenter.x);
        currentRotation = angle - startRotation;
        box.style.transform = `rotate(${currentRotation}rad)`;
    }

    if (isResizing) {
        e.preventDefault();
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (currentResizer.classList.contains('bottom-right')) {
            const newWidth = clamp(startWidth + dx, sizeLimit.minWidth,sizeLimit.maxWidth);
            const newHeight = clamp(startHeight + dy, sizeLimit.minHeight, sizeLimit.maxHeight);
            box.style.width = newWidth + 'px';
            box.style.height = newHeight + 'px';
        }
        else if (currentResizer.classList.contains('bottom-left')) {
            const newWidth = clamp(startWidth - dx,sizeLimit.minWidth, sizeLimit.maxWidth);
            const newHeight = clamp(startHeight + dy, sizeLimit.minHeight, sizeLimit.maxHeight);
            const newLeft = clamp(startLeft + dx, 0, sizeLimit.maxWidth - newWidth);
            box.style.width = newWidth + 'px';
            box.style.left = newLeft + 'px';
            box.style.height = newHeight + 'px';
        }
        else if (currentResizer.classList.contains('top-right')) {
            const newWidth = clamp(startWidth + dx, sizeLimit.minWidth, sizeLimit.maxWidth);
            const newHeight = clamp(startHeight - dy, sizeLimit.minHeight, sizeLimit.maxHeight);
            const newTop = clamp(startTop + dy, 0, sizeLimit.maxHeight - newHeight);
            box.style.width = newWidth + 'px';
            box.style.height = newHeight + 'px';
            box.style.top = newTop + 'px';
        }
        else if (currentResizer.classList.contains('top-left')) {
            const newWidth = clamp(startWidth - dx, sizeLimit.minWidth, sizeLimit.maxWidth);
            const newHeight = clamp(startHeight - dy, sizeLimit.minHeight,sizeLimit.maxHeight);
            const newLeft = clamp(startLeft + dx, 0,sizeLimit.maxWidth - newWidth);
            const newTop = clamp(startTop + dy, 0, sizeLimit.maxHeight - newHeight);
            box.style.width = newWidth + 'px';
            box.style.height = newHeight + 'px';
            box.style.top = newTop + 'px';
            box.style.left = newLeft + 'px';
        }
        else if (currentResizer.classList.contains('top-center')) {
            const newHeight = clamp(startHeight - dy, sizeLimit.minHeight, sizeLimit.maxHeight);
            const newTop = clamp(startTop + dy, 0, sizeLimit.maxHeight - newHeight);
            box.style.height = newHeight + 'px';
            box.style.top = newTop + 'px';
        }
        else if (currentResizer.classList.contains('bottom-center')) {
            const newHeight = clamp(startHeight + dy, sizeLimit.minHeight, sizeLimit.maxHeight);
            box.style.height = newHeight + 'px';
        }
        else if (currentResizer.classList.contains('left-center')) {
            const newWidth = clamp(startWidth - dx, sizeLimit.minWidth, sizeLimit.maxWidth);
            const newLeft = clamp(startLeft + dx, 0, sizeLimit.maxWidth - newWidth);
            box.style.width = newWidth + 'px';
            box.style.left = newLeft + 'px';
        }
        else if (currentResizer.classList.contains('right-center')) {
            const newWidth = clamp(startWidth + dx, sizeLimit.minWidth, sizeLimit.maxWidth);
            box.style.width = newWidth + 'px';
        }
    }
});

document.addEventListener('mouseup', function () {
    isDragging = false;
    isResizing = false;
    isRotating = false;
});