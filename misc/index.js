const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth - 100;
canvas.height = 700;
canvas.border = "black"


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


canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", (event) => stop(event, "mouseup"), false);
canvas.addEventListener("mouseout", (event) => stop(event, "mouseout"), false);
function start(event) {
    is_drawing = true;
    context.beginPath();
    context.moveTo(event.clientX - event.offsetLeft, event.clientY - event.offsetTop);
    event.preventDefault();
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
    if (type === "mouseup" || type === "mouseout" && is_drawing) {
        canvasStates.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
        is_drawing = false;
    }
   
}

//update pen size
let penSize = document.getElementsByClassName('lineWidth')[0];
penSize.addEventListener('input', updatePenSize);
function updatePenSize(e) {
    draw_width = e.target.value;
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
    if (e.ctrlKey && e.key === 'z' || e.target.id === 'undoCanvas') {
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