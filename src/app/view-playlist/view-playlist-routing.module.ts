import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewPlaylistComponent} from './view-playlist.component';
//AppRoutingModule is used in ViewComponent.

const routes: Routes = [
  {
    path: 'playlist', component: ViewPlaylistComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewPlaylistRoutingModule { }
