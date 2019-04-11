import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {VideoListModule} from '../video-list/video-list.module'
import {HomeResolverService} from './home-resolver.service';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    VideoListModule
  ],
  exports:[
    HomeComponent
  ],
  providers:[
    HomeResolverService
  ]
})
export class HomeModule { }
