import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ViewVideoComponent} from './view-video/view-video.component';
import {ViewVideoModule} from './view-video/view-video.module'

//AppRoutingModule is used in ViewComponent.

const routes: Routes = [
  {
    path: '', component: HomeComponent, pathMatch: 'full'
  },
  // {
  //   path: 'view', loadChildren: './view-video/view-video.module#ViewVideoModule'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
      { enableTracing: false } // <-- debugging purposes only
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/*
  imports: [RouterModule.forRoot(routes,
    {enableTracing:false, 
      scrollPositionRestoration: 'enabled',
      anchorScrolling:'enabled'
      // scrollOffset: [0,0]
    })],
*/