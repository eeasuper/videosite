import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {ProfileResolverService} from './profile-resolver.service';
import {VideoListModule} from '../video-list/video-list.module';
import {RouterModule} from '@angular/router'
@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    VideoListModule,
    RouterModule
  ],
  exports: [
    ProfileComponent
  ],
  providers:[
    ProfileResolverService
  ]
})
export class ProfileModule { }
