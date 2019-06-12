import { Component, OnInit,Output,ChangeDetectionStrategy,EventEmitter } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators,FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormOutput} from '../login.component';
@Component({
  selector: 'app-dumb-login',
  templateUrl: './dumb-login.component.html',
  styleUrls: ['./dumb-login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DumbLoginComponent implements OnInit {
  @Output('childSubmit') submit = new EventEmitter<FormOutput>();

  loginForm = new FormGroup({
    usernameControl: new FormControl('', [
      ]),
    passwordControl: new FormControl('', [
      ])
  });

  usernameMatcher = new MyErrorStateMatcher();

  matcher = new MyErrorStateMatcher();

  onSubmit(){
    let formOutput:FormOutput = {
      username: this.loginForm.value.usernameControl,
      password: this.loginForm.value.passwordControl
    }
    this.submit.emit(formOutput);
  }
  constructor() { }

  ngOnInit() {
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
