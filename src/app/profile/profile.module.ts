import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {ProfileResolverService} from './profile-resolver.service';
import {VideoListModule} from '../video-list/video-list.module';
@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    VideoListModule
  ],
  exports: [
    ProfileComponent
  ],
  providers:[
    ProfileResolverService
  ]
})
export class ProfileModule { }
