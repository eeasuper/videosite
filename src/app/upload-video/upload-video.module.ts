import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadVideoComponent } from './upload-video.component';

@NgModule({
  declarations: [UploadVideoComponent],
  imports: [
    CommonModule
  ],
  exports:[
    UploadVideoComponent
  ]
})
export class UploadVideoModule { }
