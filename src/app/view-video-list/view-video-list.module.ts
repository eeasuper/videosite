import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewVideoListComponent } from './view-video-list.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [ViewVideoListComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ViewVideoListComponent
  ]
})
export class ViewVideoListModule { }
