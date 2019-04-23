import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VideoListComponent} from '../video-list/video-list.component'
import {ProfileComponent} from './profile.component';
import {ProfileResolverService} from './profile-resolver.service';
import {ProfileHomeComponent} from './profile-home/profile-home.component';
import {ProfileAllVideosComponent} from './profile-all-videos/profile-all-videos.component';
import {AllVideosListResolverService} from './profile-all-videos/all-videos-list/all-videos-resolver.service';
import {AllVideosListComponent} from './profile-all-videos/all-videos-list/all-videos-list.component';
import {ProfileAllVideosResolverService} from './profile-all-videos/profile-all-videos-resolver.service';
const routes: Routes = [
  {
    path: ':userId', component: ProfileComponent,resolve:{
      data: ProfileResolverService
    },children:[
      {
        path:'', component: ProfileHomeComponent
      },
      {
        path:'video-list', component: ProfileAllVideosComponent, resolve:{
          videos: ProfileAllVideosResolverService
        }
        // ,children:[
        //   {
        //     path:'', component: AllVideosListComponent
        //   }
        // ]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
