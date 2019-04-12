import { Component, OnInit,OnDestroy } from '@angular/core';
import {SidebarService} from '../services/sidebar.service'
import {FormControl, FormGroupDirective, NgForm, Validators,FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Store } from '@ngrx/store';
import {ActionTypes} from '../store/actions/user.actions';
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    //replace with .pattern() for email with a better one I have.
  ]);

  loginForm = new FormGroup({
    usernameControl: new FormControl('', [
      ]),
    passwordControl: new FormControl('', [
      ])
  });

  usernameMatcher = new MyErrorStateMatcher();

  matcher = new MyErrorStateMatcher();

  constructor(private sidebar:SidebarService, private store:Store<any>, private router:Router) { }

  ngOnInit() {
    setTimeout(()=>{
      this.sidebar.toggle(false);  
    },0);
  }
  onSubmit(){
    console.log(this.loginForm.value);
    // Do dispatch after getting 200 from api call:
    this.store.dispatch({
      type: ActionTypes.SET_CURRENT_USER,
      payload: {
        username: this.loginForm.value.usernameControl,
        id: 1
      }
    })
    this.store.select('user').subscribe((data)=>{
      // console.log(data);
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
