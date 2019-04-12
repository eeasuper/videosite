import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListTabComponent } from './video-list-tab.component';
import {RouterModule} from '@angular/router';
@NgModule({
  declarations: [VideoListTabComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    VideoListTabComponent
  ]
})
export class VideoListTabModule { }
