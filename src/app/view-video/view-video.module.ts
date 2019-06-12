import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewVideoComponent } from './view-video.component';
import {ViewVideoRoutingModule} from './view-video-routing.module'
import {ViewVideoResolverService} from './view-video-resolver.service';
import { ViewVideoPlaylistComponent } from './view-video-playlist/view-video-playlist.component';
import { DumbViewVideoPlaylistComponent } from './view-video-playlist/dumb-view-video-playlist/dumb-view-video-playlist.component';
import { DumbViewVideoComponent } from './dumb-view-video/dumb-view-video.component';
@NgModule({
  declarations: [ViewVideoComponent, ViewVideoPlaylistComponent, DumbViewVideoPlaylistComponent, DumbViewVideoComponent],
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
