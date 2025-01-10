import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit{
    @ViewChild('sidebar') sidebarRef : ElementRef;
    isSidebarOpen: boolean = false;
    constructor(private router: Router,@Inject(DOCUMENT) private document : Document)
    {

    }
    ngAfterViewInit(): void {
        this.checkIsClickingSidbar();
    }

    //hàm dùng để check xem nếu không click sidebar thì sidbar sẽ đóng lại
    checkIsClickingSidbar()
    {
        this.document.addEventListener('click',(event) =>{
            const element = event.target as HTMLElement;
            if(element.classList.contains('img-menu-button'))
            {
                return ;
            }
            if(this.isSidebarOpen && !this.sidebarRef.nativeElement.contains(event.target))
            {
                this.closeSideBar();
            }
        });
    }


    //hàm di chuyển tới route khác
    navigateTo(route)
    {
        this.isSidebarOpen = false;
        //thay vì sử dụng set css display = none thì hiệu ứng không mượt
        // this.sidebarRef.nativeElement.style.display = 'none';
        this.closeSideBar(); //ta ta sử dụng css để làm hiệu ứng cho mượt
        this.router.navigate([route]);
    }


    showSideBar()
    {
        this.isSidebarOpen = true;
        this.sidebarRef.nativeElement.style.display = 'block'
    }

    closeSideBar()
    {
        this.isSidebarOpen = false;
    }

    
}
