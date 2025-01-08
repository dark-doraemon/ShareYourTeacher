import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-portfolio',
    imports: [],
    templateUrl: './portfolio.component.html',
    styleUrl: './portfolio.component.css',
})
export class PortfolioComponent implements AfterViewInit {


    constructor(private router: Router) {

    }

    ngAfterViewInit(): void {
    }


    scrollToSection(el: HTMLElement) {
        el.scrollIntoView({ behavior: "smooth" });
    }

}
