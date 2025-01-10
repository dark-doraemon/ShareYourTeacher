const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth - 100;
canvas.height = 700;
canvas.border = "black"
let isPen = false;

let context = canvas.getContext('2d');
context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = "black";
let draw_width = document.getElementsByClassName('lineWidth')[0].value;
let is_drawing = false;

canvas.addEventListener("touchstart", start, false)
canvas.addEventListener("touchmove", draw, false)
canvas.addEventListener("mousedown", start, false)
canvas.addEventListener("mousemove", draw, false)
canvas.addEventListener("mouseover", moveToCanvas, false)

canvas.addEventListener("touchend", stop, false);

function start(event) {
    is_drawing = true;
    context.beginPath();
    context.moveTo(event.clientX - event.offsetLeft, event.clientY - event.offsetTop);
    event.preventDefault();
}

let isMouseHolding = false;
window.addEventListener("mousedown", (event) => {
    if (event.button === 0) {
        isMouseHolding = true;
    }
});

window.addEventListener("mouseup", (event) => {
    if (event.button === 0) {
        isMouseHolding = false;
        stop(event);
    }
});


function moveToCanvas(event) {
    if (isMouseHolding) {
        start(event);
    }
}

//draw
function draw(event) {
    if (is_drawing) {
        context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    }
    event.preventDefault();
}


//stop drawing
function stop(event, type) {
    if (is_drawing) {
        context.stroke();
        context.closePath();
    }
    event.preventDefault();

    //after stopping draw we save current state of canvas
    canvasStates.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
    is_drawing = false;

}

//update pen size
let penSize = document.getElementsByClassName('lineWidth')[0];
penSize.addEventListener('input', updatePenSize);
function updatePenSize(e) {
    draw_width = e.target.value;
    let newPenSize = 20;
    if (draw_width > 5) {
        newPenSize = (draw_width * 20) / 5;
        if (newPenSize >= 120) {
            newPenSize = 120;
        }
    }
    canvas.style.cursor = `url(https://img.icons8.com/?size=${newPenSize}&id=22231&format=png&color=000000) 0 ${newPenSize}, auto`
}



//clear
let clearButton = document.getElementById("clearCanvas");
clearButton.addEventListener("click", clearCanvas)
function clearCanvas() {
    context.fillStyle = "white";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);

    canvasStates = [];
    index = -1;
}


//undo
window.addEventListener('keydown', undo, false)
let undoButton = document.getElementById("undoCanvas");
undoButton.addEventListener('click', undo, false);

let canvasStates = [];
let index = -1 // don't draw anything
function undo(e) {

    if ((e.ctrlKey && e.key === 'z') || e.target.id === 'undoCanvas') {
        if (index <= 0) {
            clearCanvas();
        }
        else {
            index -= 1;
            canvasStates.pop();
            context.putImageData(canvasStates[index], 0, 0);
        }
    }
}


//change color
let blackPen = document.getElementById("blackPen");
let redPen = document.getElementById("redPen");
blackPen.addEventListener("click", () => changeColor("black"), false);
redPen.addEventListener("click", () => changeColor("red"), false);

function changeColor(color) {
    console.log(color)
    draw_color = color
}



const eraser = document.getElementById('eraser');
eraser.addEventListener('click', (event) => {
    let newPenSize = 20;
    if (draw_width > 5) {
        newPenSize = (draw_width * 20) / 5;
        if (newPenSize >= 120) {
            newPenSize = 120;
        }

    }
    canvas.style.cursor = `url(https://img.icons8.com/?size=${newPenSize}&id=8181&format=png&color=000000) 0 ${newPenSize}, auto`
    changeColor('#fff');
})

let eraserImage = 'https://img.icons8.com/?size=20&id=8181&format=png&color=000000';
let penImage = 'https://img.icons8.com/?size=20&id=22231&format=png&color=000000';



