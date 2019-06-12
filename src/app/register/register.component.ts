import { Component, OnInit,OnDestroy,ChangeDetectionStrategy } from '@angular/core';
import {SidebarService} from '../services/sidebar.service'
import {FormControl, FormGroupDirective, NgForm, Validators,FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {ApiCallsService} from '../services/api-calls.service';
import { Store } from '@ngrx/store';
import {ActionTypes} from '../store/actions/user.actions';
import {Router} from '@angular/router'
@Component({
  selector: 'app-register',
  template: `<app-dumb-register (childSubmit)="onSubmit($event)"></app-dumb-register>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit,OnDestroy {

  constructor(private sidebar:SidebarService, private router:Router,private service:ApiCallsService, private store:Store<any>) { }

  ngOnInit() {
    setTimeout(()=>{
      this.sidebar.toggle(false);  
    },0);
  }

  onSubmit(formOutput){
    this.service.register(formOutput).then((val)=>{
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
    setTimeout(()=>{
      if(window.innerWidth <= 440 || window.innerHeight <= 360){
        this.sidebar.toggle(false)
      }else{
        this.sidebar.toggle(true);  
      }
    },0);
  }
}

