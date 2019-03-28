import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewPlaylistComponent} from './view-playlist.component';
//AppRoutingModule is used in ViewComponent.
import {EditPlaylistComponent} from './edit-playlist/edit-playlist.component';
import {PlaylistListComponent} from './playlist-list/playlist-list.component';
import {PlaylistResolverService} from './playlist-list/playlist-resolver.service';
import {EditPlaylistResolverService} from './edit-playlist/edit-playlist-resolver.service'
const routes: Routes = [
  {
    path: 'playlist', component: ViewPlaylistComponent, children:[
      {
        //path: 'userId'
        path:':userId', component: PlaylistListComponent, resolve:{
          playlists: PlaylistResolverService
        }
      },
      {
        //url should be like this: https://stackoverflow.com/users/edit/9798292
        path: ':userId/:playlistId/edit', component: EditPlaylistComponent, resolve :{
          playlist: EditPlaylistResolverService
        }
        //could add another resolver here.  
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewPlaylistRoutingModule { }
