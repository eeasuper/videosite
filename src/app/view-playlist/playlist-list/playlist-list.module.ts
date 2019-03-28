import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistListComponent } from './playlist-list.component';
import {DirectivesModule} from '../../directives/directives.module'
@NgModule({
  declarations: [PlaylistListComponent],
  imports: [
    CommonModule,
    DirectivesModule
  ],
  exports:[
    PlaylistListComponent
  ]
})
export class PlaylistListModule { }
