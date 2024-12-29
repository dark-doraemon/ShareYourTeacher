import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { TextboxComponent } from "./textbox/textbox.component";
@Component({
    selector: 'app-paint',
    imports: [ColorPickerModule, FormsModule],
    templateUrl: './paint.component.html',
    styleUrl: './paint.component.css'
})
export class PaintComponent {
    @ViewChild('textboxContainer',{read:ViewContainerRef}) container!: ViewContainerRef;
    color: string = '#000000'; // Giá trị mặc định
    penSize: number = 5;


    textBoxComponents : ComponentRef<TextboxComponent>[] = [];


    CreateTextBox()
    {
        const newTextbox = this.container.createComponent(TextboxComponent);
        this.textBoxComponents.push(newTextbox)
    }

    ChangeColor(color: string)
    {
        this.color = color
    }
}
