import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPlaylistComponent } from './view-playlist.component';
import {ViewPlaylistRoutingModule} from './view-playlist-routing.module';
import {PlaylistListModule} from './playlist-list/playlist-list.module'
// import {WindowSizeDirective} from '../directives/window-size.directive'

@NgModule({
  declarations: [ViewPlaylistComponent],
  imports: [
    CommonModule,
    PlaylistListModule,
    ViewPlaylistRoutingModule
  ]
})
export class ViewPlaylistModule { }
