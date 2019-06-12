import { Component, OnInit,OnDestroy,ChangeDetectionStrategy } from '@angular/core';
import {SidebarService} from '../services/sidebar.service'
import {FormControl, FormGroupDirective, NgForm, Validators,FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Store } from '@ngrx/store';
import {ActionTypes} from '../store/actions/user.actions';
import {Router} from '@angular/router'
import {ApiCallsService} from '../services/api-calls.service';
@Component({
  selector: 'app-login',
  template: `<app-dumb-login (childSubmit)="onSubmit($event)"></app-dumb-login>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit,OnDestroy {

  constructor(private sidebar:SidebarService, private store:Store<any>, private router:Router, private service:ApiCallsService) { }

  ngOnInit() {
    setTimeout(()=>{
      this.sidebar.toggle(false);  
    },0);
  }

  onSubmit(formOutput:FormOutput){
    this.service.login(formOutput).then((val)=>{
      if(val != null){
        this.store.dispatch({
          type: ActionTypes.SET_CURRENT_USER,
          payload: {
            username: val.username,
            id: val.id
          }
        })  
      }
    })
    this.router.navigate(['/']);
  }

  ngOnDestroy(){
    let innerWidth = window.innerWidth;
    if(innerWidth <= 440 || innerWidth <= 360){
      this.sidebar.toggle(false)
    }else{
      this.sidebar.toggle(true);  
    }
  }
}
export interface FormOutput{
  username: string;
  password: string;
}