import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewVideoComponent } from './view-video.component';
import {ViewVideoRoutingModule} from './view-video-routing.module'
import {WindowPipe} from './view-video-window.pipe';
import {ViewVideoResolverService} from './view-video-resolver.service';
@NgModule({
  declarations: [ViewVideoComponent,WindowPipe],
  imports: [
    CommonModule,
    ViewVideoRoutingModule
  ],
  exports:[
    ViewVideoComponent
  ],
  providers:[
  ViewVideoResolverService
  ]
})
export class ViewVideoModule { }
