import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DumbRegisterComponent } from './dumb-register/dumb-register.component';

@NgModule({
  declarations: [RegisterComponent, DumbRegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule
  ],
  exports:[
    RegisterComponent
  ]
})
export class RegisterModule { }
