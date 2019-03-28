import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPlaylistComponent } from './view-playlist.component';
import {ViewPlaylistRoutingModule} from './view-playlist-routing.module';
import {PlaylistListModule} from './playlist-list/playlist-list.module'
import {EditPlaylistModule} from './edit-playlist/edit-playlist.module'
import {PlaylistResolverService} from './playlist-list/playlist-resolver.service'
import {EditPlaylistResolverService} from './edit-playlist/edit-playlist-resolver.service';
@NgModule({
  declarations: [ViewPlaylistComponent],
  imports: [
    CommonModule,
    PlaylistListModule,
    ViewPlaylistRoutingModule,
    EditPlaylistModule
  ],
  providers:[
    PlaylistResolverService,
    EditPlaylistResolverService
  ]
})
export class ViewPlaylistModule { }
