import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ViewVideoComponent} from './view-video/view-video.component';
import {ViewVideoModule} from './view-video/view-video.module'
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
//AppRoutingModule is used in ViewComponent.
import {ProfileComponent} from './profile/profile.component'
import {ProfileResolverService} from './profile/profile-resolver.service';
const routes: Routes = [
  {
    path: '', component: HomeComponent, pathMatch: 'full'
  },
  {
    path:'login', component: LoginComponent, pathMatch: 'full'
  },
  {
    path:'register', component: RegisterComponent, pathMatch: 'full'
  },
  {
    path:'profile/:id', component: ProfileComponent, pathMatch: 'full',
    resolve: {
      user: ProfileResolverService
    }
  }
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