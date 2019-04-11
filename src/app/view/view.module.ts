import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view.component';
import {AppRoutingModule} from '../app-routing.module';
import {PlaylistService} from '../services/playlist.service';

@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:[
    ViewComponent
  ],
  providers:[
    PlaylistService
  ]
})
export class ViewModule { }
