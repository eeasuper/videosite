import { Component, OnInit,OnDestroy } from '@angular/core';
import {SidebarService} from '../services/sidebar.service';
import {Observable, Subscription} from 'rxjs';
import { Store } from '@ngrx/store';
import {ActionTypes} from '../store/actions/user';
import {ApiCallsService} from '../services/api-calls.service';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  public clientX: number = 0;
  public clientY: number = 0;
  public clicked: boolean;
  public authenticated:boolean;
  private user;
  public formGroup = this.fb.group({
    query: ['',[Validators.required]],
  });
  private storeSubscription:Subscription;
  get queryControl(){
    return this.formGroup.get('query');
  }
  constructor(private service:ApiCallsService, private sidebar:SidebarService, private store:Store<any>,private fb: FormBuilder,private router:Router) { }
  logout(){
    this.service.logout();
    this.store.dispatch({
      type: ActionTypes.SET_CURRENT_USER,
      payload: {username:'',id:-1}
    })
  }
  ngOnInit() {
    this.storeSubscription = this.store.select('user').subscribe(user=>{
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

  onSubmit(e){
    this.router.navigate(["search",this.queryControl.value]);
  }

  ngOnDestroy(){
    this.storeSubscription.unsubscribe();
  }
}
