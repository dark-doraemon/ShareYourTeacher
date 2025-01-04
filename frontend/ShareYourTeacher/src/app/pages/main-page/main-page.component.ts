import { Component } from '@angular/core';
import { PaintComponent } from "../../components/paint/paint.component";
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-main-page',
  imports: [RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
    constructor(private router: Router)
    {

    }

    navigateTo(route)
    {
        this.router.navigate([route]);
    }
}
