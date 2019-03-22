import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {ViewVideoComponent} from './view-video.component';

const viewVideoRoutes: Routes = [
  {
    path: 'view', component: ViewVideoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(viewVideoRoutes)],
  exports: [RouterModule]
})
export class ViewVideoRoutingModule { }
