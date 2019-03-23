import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewPlaylistComponent} from './view-playlist.component';
//AppRoutingModule is used in ViewComponent.
import {EditPlaylistComponent} from './edit-playlist/edit-playlist.component';
import {PlaylistListComponent} from './playlist-list/playlist-list.component';
import {PlaylistResolverService} from './playlist-resolver.service';

const routes: Routes = [
  {
    path: 'playlist', component: ViewPlaylistComponent, children:[
      {
        //path: 'userId'
        path:'', component: PlaylistListComponent
      },
      {
        //url should be like this: https://stackoverflow.com/users/edit/9798292
        path: 'edit', component: EditPlaylistComponent
        //could add another resolver here.  
      }
    ], resolve:{
      playlists: PlaylistResolverService
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewPlaylistRoutingModule { }
