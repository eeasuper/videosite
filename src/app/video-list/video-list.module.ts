import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListComponent } from './video-list.component';
import {VideoListTabModule} from './video-list-tab/video-list-tab.module'

@NgModule({
  declarations: [VideoListComponent],
  imports: [
    CommonModule,
    VideoListTabModule
  ],
  exports:[
    VideoListComponent,
  ]
})
export class VideoListModule { }
