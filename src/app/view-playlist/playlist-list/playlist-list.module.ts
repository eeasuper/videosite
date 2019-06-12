import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistListComponent } from './playlist-list.component';
import {RouterModule} from '@angular/router';
import { DumbPlaylistListComponent } from './dumb-playlist-list/dumb-playlist-list.component';
@NgModule({
  declarations: [PlaylistListComponent, DumbPlaylistListComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    PlaylistListComponent
  ]
})
export class PlaylistListModule { }
