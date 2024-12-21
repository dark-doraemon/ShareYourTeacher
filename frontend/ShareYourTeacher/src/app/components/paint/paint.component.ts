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
    color: string = '#FF0000'; // Giá trị mặc định
    penSize: number = 5;

    
}
