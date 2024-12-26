const box = document.querySelector('.box');
const textarea = box.querySelector('textarea');
const rotateLine = box.querySelector('.rotate-line');
let isDragging = false;
let isResizing = false;
let isRotating = false;
let currentResizer;
let startX, startY, startWidth, startHeight, startLeft, startTop;
let currentRotation = 0;

function checkTextareaContent() {
    if (textarea.value.trim() === '') {
        if(box.style.border === 'none' || box.style.border === '')
        {
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
        rotateLine.style.display= 'inline';
        rotateHandle.style.display= 'inline';
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
        rotateLine.style.display= 'none';
        rotateHandle.style.display= 'none';
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
            box.style.width = startWidth + dx + 'px';
            box.style.height = startHeight + dy + 'px';
        }
        else if (currentResizer.classList.contains('bottom-left')) {
            box.style.width = startWidth - dx + 'px';
            box.style.left = startLeft + dx + 'px';
            box.style.height = startHeight + dy + 'px';
        }
        else if (currentResizer.classList.contains('top-right')) {
            box.style.width = startWidth + dx + 'px';
            box.style.height = startHeight - dy + 'px';
            box.style.top = startTop + dy + 'px';
        }
        else if (currentResizer.classList.contains('top-left')) {
            box.style.width = startWidth - dx + 'px';
            box.style.height = startHeight - dy + 'px';
            box.style.top = startTop + dy + 'px';
            box.style.left = startLeft + dx + 'px';
        }
        else if (currentResizer.classList.contains('top-center')) {
            box.style.height = startHeight - dy + 'px';
            box.style.top = startTop + dy + 'px';
        }
        else if (currentResizer.classList.contains('bottom-center')) {
            box.style.height = startHeight + dy + 'px';
        }
        else if (currentResizer.classList.contains('left-center')) {
            box.style.width = startWidth - dx + 'px';
            box.style.left = startLeft + dx + 'px';
        }
        else if (currentResizer.classList.contains('right-center')) {
            box.style.width = startWidth + dx + 'px';
        }
    }
});

document.addEventListener('mouseup', function () {
    isDragging = false;
    isResizing = false;
    isRotating = false;
});