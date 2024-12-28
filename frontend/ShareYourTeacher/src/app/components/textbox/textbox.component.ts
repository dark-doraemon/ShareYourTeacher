import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild, HostListener, viewChildren, QueryList, ViewChildren, viewChild } from '@angular/core';
import { every } from 'rxjs';

@Component({
    selector: 'app-textbox',
    imports: [],
    templateUrl: './textbox.component.html',
    styleUrl: './textbox.component.css'
})
export class TextboxComponent implements AfterViewInit {
    @ViewChild('box') box!: ElementRef;
    @ViewChild('textarea') textarea!: ElementRef;
    @ViewChild('rotateLine') rotateLine!: ElementRef;
    @ViewChild('rotateHandle') rotateHandle!: ElementRef;
    isDragging = false;
    isResizing = false;
    isRotating = false;

    startX: number; //lưu vị trí x khi click
    startY: number; //lưu vị trí y khi click
    startWidth: number; //lưu width ban đầu của box
    startHeight: number;//lưu height ban đầu của box
    startLeft: number; //left box
    startTop: number; //top box
    resizers: any;
    currentResizer: Element;
    currentRotation = 0;
    startRotation = 0;
    sizeLimit = {
        minWidth: 200,
        minHeight: 100,
        maxWidth: 1000,
        maxHeight: 1000,
    }

    constructor(private renderer2: Renderer2) {

    }

    ngAfterViewInit(): void {
        const container = this.box.nativeElement.closest('.col-md-10');
        this.renderer2.appendChild(container,this.box.nativeElement)
        this.checkContextAreaContent();
        this.renderer2.listen(this.box.nativeElement,
            'mousedown',
            (event) => this.startDragging(event));
        this.renderer2.listen(this.textarea.nativeElement,
            'input',
            (event) => {
                this.checkContextAreaContent();
            });
        this.setDefaultEventForResizers();
        this.renderer2.listen(this.rotateHandle.nativeElement,'mousedown',(e)=>{
            this.isRotating = true;
            const boxRect = this.box.nativeElement.getBoundingClientRect();
            const boxCenter = {
                x: boxRect.left + boxRect.width / 2,
                y: boxRect.top + boxRect.height / 2
            };
            const angle = Math.atan2(e.clientY - boxCenter.y, e.clientX - boxCenter.x);
            this.startRotation = angle - this.currentRotation;
            e.stopPropagation();
        });
    }

    setDefaultEventForResizers() {
        this.resizers = this.box.nativeElement.querySelectorAll('.dot');
        this.resizers.forEach(resizer => {
            resizer.addEventListener('mousedown', (e) => {
                this.isResizing = true;
                this.currentResizer = e.target;
                this.startX = e.clientX;
                this.startY = e.clientY;
                this.startWidth = this.box.nativeElement.getBoundingClientRect().width;
                this.startHeight = this.box.nativeElement.getBoundingClientRect().height;
                this.startLeft = this.box.nativeElement.getBoundingClientRect().left;
                this.startTop = this.box.nativeElement.getBoundingClientRect().top;
                e.stopPropagation();     
                console.log(this.box.nativeElement.getBoundingClientRect());
            });
        });
    }

    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    //hàm kiểm tra textarea có được nhập không 
    //nếu textarea không có kí từ nào thì tạo một border mỏng (để cho biết là đây là textbox)
    //nếu textarea có kí tự thì xóa border đó
    checkContextAreaContent() {
        if (this.textarea.nativeElement.value.trim() === '') {
            if (this.box.nativeElement.style.border === 'none' || this.box.nativeElement.style.border === '') {
                this.textarea.nativeElement.style.border = '1px solid #ccc';
            }
        }
        else {
            this.textarea.nativeElement.style.border = 'none';
        }
    }


    //event khi mousemove
    @HostListener('document:mousemove', ['$event'])
    onMouseMove(e) {
        if (this.isDragging) {
            e.preventDefault();
            //công thức tính khi drag box 
            this.box.nativeElement.style.left = (e.clientX - this.startX) + 'px';
            this.box.nativeElement.style.top = (e.clientY - this.startY) + 'px';
        }
        if (this.isResizing) {
            e.preventDefault();
            const dx = e.clientX - this.startX;
            const dy = e.clientY - this.startY;

            if (this.currentResizer.classList.contains('bottom-right')) {
                const newWidth = this.clamp(this.startWidth + dx, this.sizeLimit.minWidth, this.sizeLimit.maxWidth);
                const newHeight = this.clamp(this.startHeight + dy, this.sizeLimit.minHeight, this.sizeLimit.maxHeight);
                this.box.nativeElement.style.width = newWidth + 'px';
                this.box.nativeElement.style.height = newHeight + 'px';
            }
            else if (this.currentResizer.classList.contains('bottom-left')) {
                const newWidth = this.clamp(this.startWidth - dx, this.sizeLimit.minWidth, this.sizeLimit.maxWidth);
                const newHeight = this.clamp(this.startHeight + dy, this.sizeLimit.minHeight, this.sizeLimit.maxHeight);
                const newLeft = this.clamp(this.startLeft + dx, 0, this.sizeLimit.maxWidth - newWidth);
                this.box.nativeElement.style.width = newWidth + 'px';
                this.box.nativeElement.style.left = newLeft + 'px';
                this.box.nativeElement.style.height = newHeight + 'px';
            }
            else if (this.currentResizer.classList.contains('top-right')) {
                const newWidth = this.clamp(this.startWidth + dx, this.sizeLimit.minWidth, this.sizeLimit.maxWidth);
                const newHeight = this.clamp(this.startHeight - dy, this.sizeLimit.minHeight, this.sizeLimit.maxHeight);
                const newTop = this.clamp(this.startTop + dy, 0, this.sizeLimit.maxHeight - newHeight);
                this.box.nativeElement.style.width = newWidth + 'px';
                this.box.nativeElement.style.height = newHeight + 'px';
                this.box.nativeElement.style.top = newTop + 'px';
            }
            else if (this.currentResizer.classList.contains('top-left')) {
                const newWidth = this.clamp(this.startWidth - dx, this.sizeLimit.minWidth, this.sizeLimit.maxWidth);
                const newHeight = this.clamp(this.startHeight - dy, this.sizeLimit.minHeight, this.sizeLimit.maxHeight);
                const newLeft = this.clamp(this.startLeft + dx, 0, this.sizeLimit.maxWidth - newWidth);
                const newTop = this.clamp(this.startTop + dy, 0, this.sizeLimit.maxHeight - newHeight);
                this.box.nativeElement.style.width = newWidth + 'px';
                this.box.nativeElement.style.height = newHeight + 'px';
                this.box.nativeElement.style.top = newTop + 'px';
                this.box.nativeElement.style.left = newLeft + 'px';
            }
            else if (this.currentResizer.classList.contains('top-center')) {
                const newHeight = this.clamp(this.startHeight - dy, this.sizeLimit.minHeight, this.sizeLimit.maxHeight);
                const newTop = this.clamp(this.startTop + dy, 0, this.sizeLimit.maxHeight - newHeight);
                this.box.nativeElement.style.height = newHeight + 'px';
                this.box.nativeElement.style.top = newTop + 'px';
            }
            else if (this.currentResizer.classList.contains('bottom-center')) {
                const newHeight = this.clamp(this.startHeight + dy, this.sizeLimit.minHeight, this.sizeLimit.maxHeight);
                this.box.nativeElement.style.height = newHeight + 'px';
            }
            else if (this.currentResizer.classList.contains('left-center')) {
                const newWidth = this.clamp(this.startWidth - dx, this.sizeLimit.minWidth, this.sizeLimit.maxWidth);
                const newLeft = this.clamp(this.startLeft + dx, 0, this.sizeLimit.maxWidth - newWidth);
                // console.log(newWidth)
                console.log(this.startLeft);
                console.log(this.startLeft + dx)
                this.box.nativeElement.style.width = newWidth + 'px';
                this.box.nativeElement.style.left = newLeft + 'px';
            }
            else if (this.currentResizer.classList.contains('right-center')) {
                const newWidth = this.clamp(this.startWidth + dx, this.sizeLimit.minWidth, this.sizeLimit.maxWidth);
                this.box.nativeElement.style.width = newWidth + 'px';
            }


        }
        if (this.isRotating) {
            e.preventDefault();
            const boxRect = this.box.nativeElement.getBoundingClientRect();
            const boxCenter = {
                x: boxRect.left + boxRect.width / 2,
                y: boxRect.top + boxRect.height / 2
            };
            const angle = Math.atan2(e.clientY- boxCenter.y,e.clientX - boxCenter.x);

            this.box.nativeElement.transform = `rotate(${angle - this.startRotation}rad)`;
        }

    }

    @HostListener('document:mouseup', ['$event'])
    onMouseUp(e) {
        this.isDragging = false;
        this.isResizing = false;
        this.isRotating = false;
    }

    @HostListener('document:mousedown', ['$event'])
    onMouseDown(event) {
        if (event.target === this.box.nativeElement || event.target.tagName === "TEXTAREA") {
        }
        else {
            this.resizers.forEach(resizer => {
                resizer.style.display = 'none';
            });

            this.box.nativeElement.style.border = 'none'
            this.rotateLine.nativeElement.style.display = 'none';
            this.rotateHandle.nativeElement.style.display = 'none';
            this.checkContextAreaContent();
        }
    }


    startDragging(event) {
        if (event.target === this.box.nativeElement || event.target.tagName === 'TEXTAREA') {
            this.isDragging = true;
            this.startX = event.clientX - this.box.nativeElement.offsetLeft;
            this.startY = event.clientY - this.box.nativeElement.offsetTop;
            this.box.nativeElement.style.border = '2px solid #333';
            this.rotateLine.nativeElement.style.display = 'inline';
            this.rotateHandle.nativeElement.style.display = 'inline';
            this.textarea.nativeElement.style.border = 'none'
            this.resizers.forEach(resizer => {
                resizer.style.display = 'inline'
            });
        }
    }


}
