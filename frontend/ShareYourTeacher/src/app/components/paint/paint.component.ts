import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
@Component({
    selector: 'app-paint',
    imports: [ColorPickerModule, FormsModule],
    templateUrl: './paint.component.html',
    styleUrl: './paint.component.css'
})
export class PaintComponent implements AfterViewInit{
    @ViewChild('canvas') myCanvas! : ElementRef;
    color: string = '#000000'; // Giá trị mặc định
    penSize: number = 5;
    cursorSize : number = 20;
    type : number = 0; 0 //0 là pen, 1 là eraser
    constructor(private renderer2 :Renderer2) {
        
    } 
    ngAfterViewInit(): void {

    }
    ChangeColor(color: string)
    {
        this.color = color
    }
    
    TriggerEraser()
    {
        this.type = 1;
        this.myCanvas.nativeElement.style.cursor = `url(https://img.icons8.com/?size=${this.cursorSize}&id=8181&format=png&color=000000) 0 ${this.cursorSize}, auto`
    }

    TriggerPen()
    {
        this.type = 0;
        this.myCanvas.nativeElement.style.cursor = `url(https://img.icons8.com/?size=${this.cursorSize}&id=22231&format=png&color=000000) 0 ${this.cursorSize}, auto`
    }



    ChangePenSize($event : Event)
    {
        console.log(($event.target as HTMLInputElement).value);
        if(this.penSize > 5)
        {
            this.cursorSize = (this.penSize  * 20) / 5;
            if(this.cursorSize >= 120)
            {
                this.cursorSize = 120
            }
        }
        if(this.type === 0)
        {
            this.TriggerPen();
        }
        else if(this.type == 1)
        {
            this.TriggerEraser();
        }
    }
}
