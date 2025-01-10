import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { CreateRoomComponent } from "./components/PageComponent/main-page/create-room/create-room.component";
import { HeaderComponent } from "./components/header/header.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MainPageComponent, CreateRoomComponent, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
    
})
export class AppComponent {
    title = 'ShareYourTeacher';
}
