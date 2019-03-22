import { Directive,HostListener,ElementRef, Renderer2,OnInit } from '@angular/core';

@Directive({
  selector: '[appWindowSize]'
})
export class WindowSizeDirective implements OnInit{

  private debounce:number = 0;
  private width:number;
  @HostListener('window:resize', ['$event'])
  setWindowSize(){
    let windowWidth = window.innerWidth;
    if(this.debounce === 0){
      this.debounce = window.setTimeout(()=>{
        this.setWidth(windowWidth,this.element.nativeElement);
        this.debounce = 0;
      },200);
    }
  }

  setWidth(windowWidth:number,element?:ElementRef){
    let sb = 0;
    // if(this.isSidebarOpen){
    //   sb = 200;
    // }
    [1260,1050,840,630,420,210].forEach((val, ind, arr)=>{
      if(windowWidth < val + sb && windowWidth > arr[ind+1] + sb){
        this.width = arr[ind+1];
        if(element){
          console.log("ff");
          this.renderer.setStyle(element, 'width', this.width + 'px');
        }
      }
      if(windowWidth > val && ind === 0){
        this.width = val;
        if(element){
          this.renderer.setStyle(element, 'width', arr[ind+1] + 'px');
        }
      }
    })
  }

  constructor(private renderer:Renderer2,private element:ElementRef) { }
  // constructor(){}
  ngOnInit(){
    this.setWindowSize();
  }
}
