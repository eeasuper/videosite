import { Component, OnInit,OnDestroy } from '@angular/core';
import {SidebarService} from '../services/sidebar.service'
import {FormControl, FormGroupDirective, NgForm, Validators,FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {ApiCallsService} from '../services/api-calls.service';
import { Store } from '@ngrx/store';
import {ActionTypes} from '../store/actions/user.actions';
import {Router} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {

  registerForm = new FormGroup({
    usernameControl: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\w][^\s]{4,24}$/),
      ]),
    passwordControl: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\w][^\s]{6,}$/)
      ]),
    emailControl: new FormControl('',[
      Validators.required,
      Validators.email
      ]),
    nameControl: new FormControl('',Validators.required)
  })

  matcher = new MyErrorStateMatcher();

  constructor(private sidebar:SidebarService, private router:Router,private service:ApiCallsService, private store:Store<any>) { }

  ngOnInit() {
    setTimeout(()=>{
      this.sidebar.toggle(false);  
    },0);
  }

  onSubmit(){
    console.log(this.registerForm.value);
    this.service.register(this.registerForm.value).then((val)=>{
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
      this.sidebar.toggle(true);  
    },0);
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
