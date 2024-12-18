// import * as signalR from "./SingalR/node_modules/@microsoft/signalr/dist/esm"
// const signalR = require('./SingalR/node_modules/@microsoft/signalr'
// import { HubConnection} from "./SingalR/node_modules/@microsoft/signalr"

const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5091/hub/presence")
    .configureLogging(signalR.LogLevel.Information)
    .build();

connection.start().then(() => {
    console.log("Connected successfully");
}).catch((error) => {
    console.log(error);
});
//connect
let connectButton = document.getElementById("connect");
connectButton.addEventListener('click', () => {
    connection.start().then(() => {
        console.log("Connected successfully");
    }).catch((error) => {
        console.log(error);
    });
})

//disconnect
let disconnect = document.getElementById("disconnect");
disconnect.addEventListener('click', () => {
    connection.stop().then().catch(error => {
        console.log(error)
    });
});


//tạo hàm có tên UserIsOnline (hàm này sẽ được gọi ở phía server)
connection.on("UserIsOnline", connectionId => {
    console.log(connectionId);
});

connection.on("UserIsOffline", connectionId => {
    console.log(connectionId);
});


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
        Sendbase64ImageToServer()
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

    //ta có thể dùng truyền DataImage để truyền dữ liệu cho server nhưng nó không tối ưu (rất lag)
    // const payload = {
    //     width: canvasStates[index].width,
    //     height: canvasStates[index].height,
    //     data: Array.from(canvasStates[index].data),
    //     colorSpace: canvasStates[index].colorSpace
    // }
    // connection.invoke("Draw", payload).catch(err => {
    //     console.error("Error sending data to server:", err);
    // });

    //sử dụng base64 để truyền
    // Sendbase64ImageToServer()
}

function Sendbase64ImageToServer()
{
    const base64Image = canvas.toDataURL("image/png");
    connection.invoke("Draw", base64Image).catch(err => {
        console.error("Error sending data to server:", err);
    });
}

//vễ bằng DataImage
// connection.on("ReceiveDrawData", (image) => {
//     // Vẽ lại canvas từ dữ liệu nhận được
//     const canvas = document.getElementById("canvas");
//     const ctx = canvas.getContext("2d");

//     const imageData = ctx.createImageData(image.width, image.height);
//     imageData.data.set(new Uint8ClampedArray(image.data)); // Gắn dữ liệu pixel
//     ctx.putImageData(imageData, 0, 0); // Vẽ lên canvas
// });

//vẽ bằng base64
connection.on("ReceiveDrawData", (base64Image) => {
    const img = new Image();
    //onload dược gọi hình src được tải xong, hình src được tải xong onload được kích hoạt
    img.onload = () => {
        context.drawImage(img, 0, 0);
    }
    img.src = base64Image;
});


function drawFromData(drawData) {
    context.fillRect(drawData);
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
    Sendbase64ImageToServer()
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
        Sendbase64ImageToServer();
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




