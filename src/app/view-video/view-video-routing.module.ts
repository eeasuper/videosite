import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {ViewVideoComponent} from './view-video.component';
import {ViewVideoResolverService} from './view-video-resolver.service';

const viewVideoRoutes: Routes = [
  {
    path: 'view/:videoid', component: ViewVideoComponent,resolve:{
      video:ViewVideoResolverService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(viewVideoRoutes)],
  exports: [RouterModule]
})
export class ViewVideoRoutingModule { }
