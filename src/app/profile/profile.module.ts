import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {ProfileResolverService} from './profile-resolver.service';
import {VideoListModule} from '../video-list/video-list.module';
import {RouterModule} from '@angular/router'
import {ProfileRoutingModule} from './profile-routing.module';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { ProfileAllVideosComponent } from './profile-all-videos/profile-all-videos.component';
import {ProfileService} from './profile.service';
import { AllVideosListComponent } from './profile-all-videos/all-videos-list/all-videos-list.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ViewVideoListModule} from '../view-video-list/view-video-list.module';
// import {ReusableComponentsModule} from '../reusable-components/reusable-components.module';
// import {DialogUploadComponent} from '../reusable-components/dialog-upload/dialog-upload.component';
@NgModule({
  declarations: [ProfileComponent, ProfileHomeComponent, ProfileAllVideosComponent, AllVideosListComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    VideoListModule,
    RouterModule,
    MatPaginatorModule,
    ViewVideoListModule
    // ReusableComponentsModule,
    // DialogUploadComponent
  ],
  exports: [
    ProfileComponent
  ],
  providers:[
    ProfileResolverService,
    ProfileService
  ]
})
export class ProfileModule { }
