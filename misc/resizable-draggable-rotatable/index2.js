const box = document.querySelector('.box');
let isDragging = false;
let isResizing= false
let isRotating = false;
let startX, startY, startWidth, startHeight, startLeft, startTop;
let minSize = {
    w: 170,
    h: 70
}


box.addEventListener('mousedown', (event) => {
    if (event.target == box || event.target.tagName == 'TEXTAREA') {
        isDragging = true;
        //clientX là vị trí của con trỏ trên màn hình tức là khoảng cách từ mép trái của màn hình tới con trỏ theo trục X
        //clientY là vị trí của con trỏ trên màn hình tức là khoảng cách từ mép trên của màn hình tới con trỏ theo trục Y
        // box.offsetLeft: là khoảng cách từ mép trái của box đến mép trái của trang web
        //         Giả sử:
        // - Box có offsetLeft = 100px (cách mép trái trang 100px)
        // - Người dùng click tại clientX = 150px
        // - Thì startX = 150 - 100 = 50px
        // -> Nghĩa là người dùng click cách mép trái box 50px
        //tương tự cho trục 
        startX = event.clientX - box.offsetLeft;
        startY = event.clientY - box.offsetTop;
        // Mục đích:
        // Khi di chuyển box, ta muốn box di chuyển mà vẫn giữ nguyên khoảng cách từ điểm click đến các mép của box
    }
});
//lưu ý left và offsetLeft
//left là khoảng cách từ mép trái của phần từ đến mép trái của phần tử "cha" (có thể gán)
//offsetLeft là khoảng cách từ mép trái của phần từ đến mép trái của "màn hình"(read-only)
document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        event.preventDefault();
        box.style.left = (event.clientX - startX) + 'px';
        box.style.top = (event.clientY - startY) + 'px';
    }
    if (isResizing) {
        event.preventDefault();
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;

        if (currentResizer.classList.contains('bottom-right')) {
            box.style.width = startWidth + dx + 'px';
            box.style.height = startHeight + dy + 'px';
        }
        else if (currentResizer.classList.contains('bottom-left')) {
            box.style.width = startWidth - dx + 'px';//width tăng
            box.style.left = startLeft + dx + 'px';//left giảm
            // box.style.height = startHeight + dy + 'px';
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


let currentResizer;
const resizers = document.querySelectorAll('.dot');
resizers.forEach(resizer => {
    resizer.addEventListener('mousedown', (event) => {
        isResizing = true;
        currentResizer = event.target;
        startX = event.clientX;
        startY = event.clientY;
        startWidth = box.getBoundingClientRect().width;
        startHeight = box.getBoundingClientRect().height;
        startLeft = event.offsetLeft;
        startTop = event.offsetTop;
        event.stopPropagation();
        console.log(currentResizer)
    });
});