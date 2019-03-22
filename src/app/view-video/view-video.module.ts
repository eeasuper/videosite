import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewVideoComponent } from './view-video.component';
import {ViewVideoRoutingModule} from './view-video-routing.module'
import {WindowPipe} from './view-video-window.pipe';

@NgModule({
  declarations: [ViewVideoComponent,WindowPipe],
  imports: [
    CommonModule,
    ViewVideoRoutingModule
  ],
  exports:[
    ViewVideoComponent
  ]
})
export class ViewVideoModule { }
