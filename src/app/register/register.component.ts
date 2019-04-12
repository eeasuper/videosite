import { Component, OnInit,OnDestroy } from '@angular/core';
import {SidebarService} from '../services/sidebar.service'
import {FormControl, FormGroupDirective, NgForm, Validators,FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

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

  constructor(private sidebar:SidebarService) { }

  ngOnInit() {
    setTimeout(()=>{
      this.sidebar.toggle(false);  
    },0);
  }

  onSubmit(){
    console.log(this.registerForm.value);
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
