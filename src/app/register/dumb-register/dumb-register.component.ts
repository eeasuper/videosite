import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators,FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
@Component({
  selector: 'app-dumb-register',
  templateUrl: './dumb-register.component.html',
  styleUrls: ['./dumb-register.component.css']
})
export class DumbRegisterComponent implements OnInit {

  @Output('childSubmit') submit = new EventEmitter<any>();  
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

  constructor() { }

  onSubmit(){
    this.submit.emit(this.registerForm.value);
  }
  ngOnInit() {
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
