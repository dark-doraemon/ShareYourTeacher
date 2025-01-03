import { AfterViewInit, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { isReactive } from '@angular/core/primitives/signals';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { every } from 'rxjs';
@Component({
    selector: 'app-paint',
    imports: [ColorPickerModule, FormsModule],
    templateUrl: './paint.component.html',
    styleUrl: './paint.component.css'
})
export class PaintComponent implements AfterViewInit {
    @ViewChild('canvas') myCanvas!: ElementRef;
    myCanvasNative: HTMLCanvasElement;
    draw_color: string = '#000000'; // Giá trị mặc định
    penSize: number = 5;
    cursorSize: number = 20;
    context: CanvasRenderingContext2D = null;
    isDrawing = false;
    type: number = 0; 0 //0 là pen, 1 là eraser
    isMouseHolding = false;
    canvasStates = [];
    canvasStateIndex = -1;
    constructor(private renderer2: Renderer2) {

    }
    ngAfterViewInit(): void {
        this.SetUpCanvas();

    }

    SetUpCanvas() {
        this.myCanvasNative = this.myCanvas.nativeElement;
        this.myCanvasNative.width = this.myCanvasNative.parentElement.clientWidth - 50;
        this.myCanvasNative.height = this.myCanvasNative.parentElement.clientHeight;
        // this.myCanvasNative.width = ;
        this.context = this.myCanvasNative.getContext('2d')
        this.context.fillStyle = '#eaeaea';
        this.context.fillRect(0, 0, this.myCanvasNative.width, this.myCanvasNative.height)
        this.context.lineWidth = this.penSize;
        this.context.strokeStyle = this.draw_color;

        this.renderer2.listen(this.myCanvasNative, 'mousedown', event => this.StartDrawing(event));
        this.renderer2.listen(this.myCanvasNative, 'mousemove', event => this.Draw(event));
        this.renderer2.listen(this.myCanvasNative, 'mouseover', event => this.MoveToCanvas(event))

    }

    StartDrawing(event: MouseEvent) {
        event.preventDefault();
        this.isDrawing = true;
        this.context.beginPath();
        this.context.moveTo(event.offsetX, event.offsetY);
        console.log(event.offsetX, event.offsetY);
    }

    Draw(event: MouseEvent) {
        event.preventDefault();
        if (!this.isDrawing) {
            return;
        }
        this.context.strokeStyle = this.draw_color;
        this.context.lineWidth = this.penSize;
        this.context.lineTo(event.offsetX, event.offsetY);
        this.context.lineCap = "round";
        this.context.lineJoin = "round";
        this.context.stroke();
    }

    StopDrawing(event) {
        if(!this.isDrawing)
        {
            return;
        }
        event.preventDefault();
        if (this.isDrawing) {
            this.context.stroke();
            this.context.closePath();
        }
        this.canvasStates.push(this.context.getImageData(0, 0, this.myCanvasNative.width, this.myCanvasNative.height));
        this.canvasStateIndex += 1;
        this.isDrawing = false
    }

    @HostListener('window:mousedown', ['$event'])
    windowMouseDown(event) {
        if (event.button === 0) {
            this.isMouseHolding = true;
        }
    }

    @HostListener('window:mouseup', ['$event'])
    windowMouseUp(event) {
        if (event.button === 0 ) {
            this.isMouseHolding = false;
            this.StopDrawing(event);
        }
    }

    @HostListener('window:keydown', ['$event'])
    KeyDownUndo(event: KeyboardEvent) {
        if ((event.ctrlKey && event.key == 'z') ) {
            this.HandleUndo();
        }
    }

    ClickUndo(event)
    {
        this.HandleUndo()
    }


    HandleUndo()
    {
        if (this.canvasStateIndex <= 0) {
            this.ClearCanvas();
        }
        else {
            this.canvasStateIndex -= 1;
            this.canvasStates.pop();
            this.context.putImageData(this.canvasStates[this.canvasStateIndex], 0, 0);
        }
    }
    ClearCanvas() {
        this.context.fillStyle = '#eaeaea';
        this.context.clearRect(0, 0, this.myCanvasNative.width, this.myCanvasNative.height);
        this.context.fillRect(0, 0, this.myCanvasNative.width, this.myCanvasNative.height);
        this.canvasStates = [];
        this.canvasStateIndex = -1;
    }

    MoveToCanvas(event: MouseEvent) {
        if (this.isMouseHolding) {
            this.StartDrawing(event);
        }
    }


    ChangeColor(color) {

        this.draw_color = color
    }

    TriggerEraser() {
        this.type = 1;
        this.myCanvas.nativeElement.style.cursor = `url(https://img.icons8.com/?size=${this.cursorSize}&id=8181&format=png&color=000000) 0 ${this.cursorSize}, auto`
        this.ChangeColor('#eaeaea');
    }

    TriggerPen() {
        this.type = 0;
        this.myCanvas.nativeElement.style.cursor = `url(https://img.icons8.com/?size=${this.cursorSize}&id=22231&format=png&color=000000) 0 ${this.cursorSize}, auto`
    }

    ChangePenSize($event: Event) {
        // console.log(($event.target as HTMLInputElement).value);
        this.penSize = parseInt(($event.target as HTMLInputElement).value, 10);
        if (this.penSize > 5) {
            this.cursorSize = (this.penSize * 20) / 5;
            if (this.cursorSize >= 120) {
                this.cursorSize = 120
            }
        }
        if (this.type === 0) {
            this.TriggerPen();
        }
        else if (this.type == 1) {
            this.TriggerEraser();
        }
    }
}
