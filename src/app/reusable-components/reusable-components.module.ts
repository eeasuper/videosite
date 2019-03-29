import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogCloseComponent} from './dialog-close/dialog-close.component'
import {MatDialogModule} from '@angular/material/dialog'; 
@NgModule({
  declarations: [DialogCloseComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports:[
  DialogCloseComponent
  ]
})
export class ReusableComponentsModule { }
