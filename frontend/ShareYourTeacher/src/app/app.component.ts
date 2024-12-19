import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaintComponent } from "./components/paint/paint.component";
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
@Component({
    selector: 'app-root',
    imports: [RouterOutlet, PaintComponent,ColorPickerModule,FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'ShareYourTeacher';
}
