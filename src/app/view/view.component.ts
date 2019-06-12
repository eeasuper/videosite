import { Component, OnInit,HostBinding,ViewChild,ElementRef,Renderer2,HostListener} from '@angular/core';
import {SidebarService} from '../services/sidebar.service';

@Component({
  selector: 'app-view',
  template: `<router-outlet></router-outlet>`,
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
    if(this.debounce === 0){
      this.debounce = window.setTimeout(()=>{
        if(this.isOpen && windowWidth <= 1050){
          this.sidebar.toggle(false);
        } else if(!this.isOpen && windowWidth >= 1050){
          this.sidebar.toggle(true);
        }
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
