import { Component, OnInit,OnDestroy } from '@angular/core';
import {SidebarService} from '../services/sidebar.service'
import {FormControl, FormGroupDirective, NgForm, Validators,FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Store } from '@ngrx/store';
import {ActionTypes} from '../store/actions/user.actions';
import {Router} from '@angular/router'
import {ApiCallsService} from '../services/api-calls.service';
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

  constructor(private sidebar:SidebarService, private store:Store<any>, private router:Router, private service:ApiCallsService) { }

  ngOnInit() {
    setTimeout(()=>{
      this.sidebar.toggle(false);  
    },0);
  }
  onSubmit(){
    this.service.login(this.loginForm.value).then((val)=>{
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
