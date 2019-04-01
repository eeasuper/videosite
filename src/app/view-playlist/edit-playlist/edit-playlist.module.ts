import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPlaylistComponent } from './edit-playlist.component';
import {DirectivesModule} from '../../directives/directives.module';
import {ReusableComponentsModule} from '../../reusable-components/reusable-components.module';
import {DraggableCellService} from './draggable-cell.service';
import {DragDropModule} from '@angular/cdk/drag-drop'; 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {DialogCloseComponent} from '../../reusable-components/dialog-close/dialog-close.component'
import {RouterModule} from '@angular/router'
@NgModule({
  declarations: [EditPlaylistComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    DragDropModule,
    ReusableComponentsModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  providers:[DraggableCellService],

})
export class EditPlaylistModule { }
