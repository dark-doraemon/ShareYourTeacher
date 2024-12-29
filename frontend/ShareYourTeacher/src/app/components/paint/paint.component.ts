import { Component, ComponentRef, HostListener, ViewChild, ViewContainerRef } from '@angular/core';
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

    selectedTextbox : ComponentRef<TextboxComponent> | null = null;

    color: string = '#000000'; // Giá trị mặc định
    penSize: number = 5;


    textBoxComponents : ComponentRef<TextboxComponent>[] = [];


    CreateTextBox()
    {
        const newTextbox = this.container.createComponent(TextboxComponent);
        
        newTextbox.instance.focusEvent.subscribe((textbox: TextboxComponent) =>{
            this.onTextboxFocus(newTextbox);
        });

        this.textBoxComponents.push(newTextbox)
    }

    onTextboxFocus(textboxRef: ComponentRef<TextboxComponent>) {
        this.selectedTextbox = textboxRef;
        // console.log('Selected textbox:', textboxRef.instance); 
    }

    ChangeColor(color: string)
    {
        this.color = color
    }

    @HostListener('window:keydown',['$event']) 
    HandleKeyDown(e) {
        if(e.key === 'Delete' && this.selectedTextbox)
        {
            this.DeleteSelectedTextbox();
        }
    }


    DeleteSelectedTextbox()
    {
        if(this.selectedTextbox)
        {
            const index = this.textBoxComponents.indexOf(this.selectedTextbox);
            if(index > -1)
            {
                this.textBoxComponents.splice(index,1);
                this.selectedTextbox.destroy();
                this.selectedTextbox = null;
            }
        }
    }
}
