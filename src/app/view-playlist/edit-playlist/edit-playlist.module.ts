import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPlaylistComponent } from './edit-playlist.component';
import {ReusableComponentsModule} from '../../reusable-components/reusable-components.module';
import {DragDropModule} from '@angular/cdk/drag-drop'; 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {RouterModule} from '@angular/router';
import { DumbEditPlaylistComponent } from './dumb-edit-playlist/dumb-edit-playlist.component'
@NgModule({
  declarations: [EditPlaylistComponent, DumbEditPlaylistComponent],
  imports: [
    CommonModule,
    DragDropModule,
    ReusableComponentsModule,
    RouterModule
  ]

})
export class EditPlaylistModule { }
