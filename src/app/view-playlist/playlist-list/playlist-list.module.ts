import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistListComponent } from './playlist-list.component';
import {WindowSizeDirectiveModule} from '../../directives/window-size-directive.module'
@NgModule({
  declarations: [PlaylistListComponent],
  imports: [
    CommonModule,
    WindowSizeDirectiveModule
  ],
  exports:[
    PlaylistListComponent
  ]
})
export class PlaylistListModule { }
