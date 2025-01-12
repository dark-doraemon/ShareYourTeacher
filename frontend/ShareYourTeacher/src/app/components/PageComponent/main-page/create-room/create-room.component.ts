import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-create-room',
    imports: [RouterLink,CommonModule],
    templateUrl: './create-room.component.html',
    styleUrl: './create-room.component.css'
})
export class CreateRoomComponent implements AfterViewInit{
    @ViewChild('memberQuantity') memberQuantity: ElementRef;
    @ViewChild('checkbox') checkBoxRef: ElementRef;
    isUnlimitedMember : boolean = true;
    constructor(private renderer2 : Renderer2) {}


    ngAfterViewInit(): void{
        //mặc định là không giói hạng thành viên
        this.checkBoxRef.nativeElement.checked = this.isUnlimitedMember 
    }

    checkCheckboxValue(event)
    {
        this.isUnlimitedMember = event.target.checked;
    }

}
