import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistListComponent } from './playlist-list.component';
import {DirectivesModule} from '../../directives/directives.module'
import {RouterModule} from '@angular/router';
@NgModule({
  declarations: [PlaylistListComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    RouterModule
  ],
  exports:[
    PlaylistListComponent
  ]
})
export class PlaylistListModule { }
