import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
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


    constructor(private renderer2: Renderer2) {

    }
    ngAfterViewInit(): void {
        this.myCanvasNative = this.myCanvas.nativeElement;
        this.SetUpCanvas();
    }

    SetUpCanvas() {
        this.context = this.myCanvasNative.getContext('2d');
        const cssWidth = this.myCanvasNative.offsetWidth;
        const cssHeight = this.myCanvasNative.offsetHeight;
        const scale = window.devicePixelRatio || 1;
        this.myCanvasNative.width = cssWidth * scale;
        this.myCanvasNative.height = cssHeight * scale;
        this.context.scale(scale, scale);
        // this.context.beginPath();
        // this.context.moveTo(0, 0);
        // this.context.lineTo(100, 100);
        // this.context.stroke();
        this.context.fillStyle = "#eaeaea";
        this.context.lineCap = 'round';
        this.context.lineWidth = this.penSize;
        this.context.strokeStyle = this.draw_color;
        this.context.fillRect(0, 0, this.myCanvasNative.width, this.myCanvasNative.height);
        this.renderer2.listen(this.myCanvasNative, "mousedown", event => this.StartDrawing(event));
        this.renderer2.listen(this.myCanvasNative, 'mousemove', event => this.Draw(event));
        this.renderer2.listen(this.myCanvasNative, 'mouseup', event => this.StopDrawing(event));
    }

    StartDrawing(event: MouseEvent) {
        event.preventDefault();
        this.isDrawing = true;
        this.context.beginPath();
        // console.log(event.clientX - this.myCanvasNative.offsetLeft, event.clientY - this.myCanvasNative.offsetTop);
        console.log(event.offsetX, event.offsetY);
        // console.log(event.clientX, event.clientY);
        // this.context.moveTo(event.clientX - this.myCanvasNative.offsetLeft, event.clientY - this.myCanvasNative.offsetTop);
        this.context.moveTo(event.offsetX, event.offsetY);
        //   this.context.moveTo(event.offsetX, event.offsetY);
    }

    StopDrawing(event) {
        this.isDrawing = false;
    }

    Draw(event: MouseEvent) {
        event.preventDefault();
        if (!this.isDrawing) {
            return;
        }
        // console.log(event.clientX - this.myCanvasNative.offsetLeft, event.clientY - this.myCanvasNative.offsetTop);
        // this.context.lineTo(event.clientX - this.myCanvasNative.offsetLeft, event.clientY - this.myCanvasNative.offsetTop);
        console.log(event.offsetX, event.offsetY);
        this.context.lineTo(event.offsetX, event.offsetY);
        this.context.stroke();
    }

    ChangeColor(color) {

        this.draw_color = color
    }

    TriggerEraser() {
        this.type = 1;
        this.myCanvas.nativeElement.style.cursor = `url(https://img.icons8.com/?size=${this.cursorSize}&id=8181&format=png&color=000000) 0 ${this.cursorSize}, auto`
    }

    TriggerPen() {
        this.type = 0;
        this.myCanvas.nativeElement.style.cursor = `url(https://img.icons8.com/?size=${this.cursorSize}&id=22231&format=png&color=000000) 0 ${this.cursorSize}, auto`
    }


    ChangePenSize($event: Event) {
        console.log(($event.target as HTMLInputElement).value);
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
