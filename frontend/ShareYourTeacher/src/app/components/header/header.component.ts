import { Component, ElementRef, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    @ViewChild('sidebar') sidebarRef : ElementRef;
    constructor(private router: Router)
    {

    }

    navigateTo(route)
    {
        this.router.navigate([route]);
    }


    showSideBar()
    {
        this.sidebarRef.nativeElement.style.display = 'block'
    }

    closeSideBar()
    {
        this.sidebarRef.nativeElement.style.display = 'none';
    }
}
