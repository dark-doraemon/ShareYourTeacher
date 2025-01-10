import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { PaintComponent } from "../../components/paint/paint.component";
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
    selector: 'app-main-page',
    imports: [RouterOutlet, RouterLink, HeaderComponent],
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.css',
    // host: {
    //     '[style.height]': "'100%'",
    //     '[style.width]': "'100%'",
    // }
})
export class MainPageComponent implements AfterViewInit {
   
    constructor(
        private router: Router,
        private elementRef:ElementRef 
    ) {}
    ngAfterViewInit(): void {
    }

    navigateTo(route) {
        console.log(route);
        this.router.navigate([route]);
    }
}
