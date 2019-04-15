import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {ProfileResolverService} from './profile-resolver.service';
import {VideoListModule} from '../video-list/video-list.module';
import {RouterModule} from '@angular/router'
// import {ReusableComponentsModule} from '../reusable-components/reusable-components.module';
// import {DialogUploadComponent} from '../reusable-components/dialog-upload/dialog-upload.component';
@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    VideoListModule,
    RouterModule,
    // ReusableComponentsModule,
    // DialogUploadComponent
  ],
  exports: [
    ProfileComponent
  ],
  providers:[
    ProfileResolverService
  ]
})
export class ProfileModule { }
