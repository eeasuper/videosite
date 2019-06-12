import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogCloseComponent} from './dialog-close/dialog-close.component'
import {MatDialogModule} from '@angular/material/dialog';
import { DialogUploadComponent } from './dialog-upload/dialog-upload.component'; 
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DialogAddVideoPlaylistComponent } from './dialog-add-video-playlist/dialog-add-video-playlist.component';
import { DialogCreatePlaylistComponent } from './dialog-create-playlist/dialog-create-playlist.component';
import { DumbDialogUploadComponent } from './dialog-upload/dumb-dialog-upload/dumb-dialog-upload.component';
import { DumbDialogCreatePlaylistComponent } from './dialog-create-playlist/dumb-dialog-create-playlist/dumb-dialog-create-playlist.component';
import { DumbDialogAddVideoPlaylistComponent } from './dialog-add-video-playlist/dumb-dialog-add-video-playlist/dumb-dialog-add-video-playlist.component';

@NgModule({
  declarations: [DialogCloseComponent, DialogUploadComponent, DialogAddVideoPlaylistComponent, DialogCreatePlaylistComponent, DumbDialogUploadComponent, DumbDialogCreatePlaylistComponent, DumbDialogAddVideoPlaylistComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  exports:[
    DialogCloseComponent,
    DialogUploadComponent,
    DialogAddVideoPlaylistComponent
  ]
})
export class ReusableComponentsModule { }
