import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-portfolio',
    imports: [],
    templateUrl: './portfolio.component.html',
    styleUrl: './portfolio.component.css',
})
export class PortfolioComponent implements AfterViewInit {

    @ViewChild('menuicon') menuIcon : ElementRef;
    @ViewChild('navLinks') navLinks : ElementRef;

    constructor(private router: Router,private renderer2 : Renderer2,@Inject(DOCUMENT) private document: Document) {

    }

    ngAfterViewInit(): void {
        this.toggleMenu();
        this.checkIsClickingMenu();
    }


    scrollToSection(el: HTMLElement) {
        el.scrollIntoView({ behavior: "smooth" });
    }

    toggleMenu(){
        this.renderer2.listen(this.menuIcon.nativeElement,'click',(event)=>{
            this.navLinks.nativeElement.classList.add('active');
        });
    }


    checkIsClickingMenu()
    {
        this.renderer2.listen(this.document,'click',(event : MouseEvent) =>{
            const element = event.target as HTMLElement;
            if(element.id !== 'menu-icon')
            {
                this.navLinks.nativeElement.classList.remove('active');
            }
        });
    }

}
