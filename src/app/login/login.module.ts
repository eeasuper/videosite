import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DumbLoginComponent } from './dumb-login/dumb-login.component';

@NgModule({
  declarations: [LoginComponent, DumbLoginComponent],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
  LoginComponent
  ],
})
export class LoginModule { }
