import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewVideoComponent } from './view-video.component';
import {ViewVideoRoutingModule} from './view-video-routing.module'
import {WindowPipe} from './view-video-window.pipe';
import {ViewVideoResolverService} from './view-video-resolver.service';
import { ViewVideoPlaylistComponent } from './view-video-playlist/view-video-playlist.component';
@NgModule({
  declarations: [ViewVideoComponent,WindowPipe, ViewVideoPlaylistComponent],
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
