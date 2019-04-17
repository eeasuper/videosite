import { Component, OnInit,HostBinding,ViewChild,ElementRef,Renderer2,HostListener} from '@angular/core';
import {SidebarService} from '../services/sidebar.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  @HostBinding('class.is-open-view')
  isOpen = true;
  private debounce:number = 0;
  private downSized:boolean;

  @HostListener('window:resize', ['$event'])
  changeWidth(){
    let windowWidth = window.innerWidth;
  //   // console.log(this.downSized);
  //   // console.log(windowWidth);
    if(this.debounce === 0){
      this.debounce = window.setTimeout(()=>{
        if(this.isOpen && windowWidth <= 1050){
          this.sidebar.toggle(false);
        } else if(!this.isOpen && windowWidth >= 1050){
          this.sidebar.toggle(true);
        }

  //       if(windowWidth <= 850){
  //         this.downSized = true;
  //       }else if(windowWidth >= 850){
  //         this.downSized = false;
  //       }

  //       if(this.isOpen){
  //         this.renderer.setStyle(this.element.nativeElement,"width", windowWidth-200+"px");
  //       }else{
  //         this.renderer.setStyle(this.element.nativeElement,"width", "100%");
  //       }
        this.debounce = 0;
      },50);
    }

  }

  constructor(private sidebar:SidebarService, private renderer:Renderer2, private element:ElementRef) { }
  
  ngOnInit() {
    this.sidebar.change.subscribe(isOpen =>{
      this.isOpen = isOpen;
    })
    this.changeWidth();
  }

}
