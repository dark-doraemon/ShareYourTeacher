import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
@Component({
    selector: 'app-paint',
    imports: [ColorPickerModule, FormsModule],
    templateUrl: './paint.component.html',
    styleUrl: './paint.component.css'
})
export class PaintComponent {
    color: string = '#000000'; // Giá trị mặc định
    penSize: number = 5;

    
    ChangeColor(color: string)
    {
        this.color = color
    }
}
