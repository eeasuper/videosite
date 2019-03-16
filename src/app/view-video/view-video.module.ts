import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewVideoComponent } from './view-video.component';

@NgModule({
  declarations: [ViewVideoComponent],
  imports: [
    CommonModule
  ],
  exports:[
    ViewVideoComponent
  ]
})
export class ViewVideoModule { }
