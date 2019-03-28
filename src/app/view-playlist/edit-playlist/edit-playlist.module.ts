import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPlaylistComponent } from './edit-playlist.component';
import {DirectivesModule} from '../../directives/directives.module';

import {DraggableCellService} from './draggable-cell.service';
import {DragDropModule} from '@angular/cdk/drag-drop'; 

@NgModule({
  declarations: [EditPlaylistComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    DragDropModule
  ],
  providers:[DraggableCellService]
})
export class EditPlaylistModule { }
