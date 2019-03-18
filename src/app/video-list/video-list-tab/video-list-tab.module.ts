import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListTabComponent } from './video-list-tab.component';

@NgModule({
  declarations: [VideoListTabComponent],
  imports: [
    CommonModule
  ],
  exports:[
    VideoListTabComponent
  ]
})
export class VideoListTabModule { }
