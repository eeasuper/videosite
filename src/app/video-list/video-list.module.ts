import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListComponent } from './video-list.component';
import {VideoListTabComponent} from './dumb-video-list/video-list-tab/video-list-tab.component';
import { DumbVideoListComponent } from './dumb-video-list/dumb-video-list.component'
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [VideoListComponent, DumbVideoListComponent,VideoListTabComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    VideoListComponent,
  ]
})
export class VideoListModule { }
