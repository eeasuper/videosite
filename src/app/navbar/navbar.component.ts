import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../services/sidebar.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private clientX: number = 0;
  private clientY: number = 0;
  private clicked: boolean;

  constructor(private sidebar:SidebarService) { }

  ngOnInit() {
  }

  doRipple(event: MouseEvent):void{
    this.sidebar.toggle();
    this.clicked = true;
    this.clientX = event.clientX;
    this.clientY = event.clientY;
    setTimeout(()=>{
      this.clicked = false;
    },0)
  }

  toggleShowing(): void{
    // if(this.isSidebarShowing){
    //   this.sidebarService.isShowingSubject.next(false);
    //   this.showSidebar.emit(false);
    // }else if(!this.isSidebarShowing){
    //   this.sidebarService.isShowingSubject.next(true);
    //   this.showSidebar.emit(true);
    // } 
  }
}
