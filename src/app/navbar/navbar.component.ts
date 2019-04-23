import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../services/sidebar.service';
import {Observable, Subscription} from 'rxjs';
import { Store } from '@ngrx/store';
import {ActionTypes} from '../store/actions/user';
import {ApiCallsService} from '../services/api-calls.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private clientX: number = 0;
  private clientY: number = 0;
  private clicked: boolean;
  private authenticated:boolean;
  private user;
  constructor(private service:ApiCallsService, private sidebar:SidebarService, private store:Store<any>) { }
  logout(){
    this.service.logout();
    this.store.dispatch({
      type: ActionTypes.SET_CURRENT_USER,
      payload: {username:'',id:-1}
    })
  }
  ngOnInit() {
    this.store.select('user').subscribe(user=>{
      // console.log(user);
      if(!user.isAuthenticated){
        this.authenticated = false;
      }else if(user.isAuthenticated){
        this.authenticated = true;
        this.user = user.user;
      }else{
        this.authenticated = false
      }
    })
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
