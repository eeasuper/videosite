import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewPlaylistComponent} from './view-playlist.component';
import {EditPlaylistComponent} from './edit-playlist/edit-playlist.component';
import {PlaylistListComponent} from './playlist-list/playlist-list.component';
import {PlaylistResolverService} from './playlist-list/playlist-resolver.service';
import {EditPlaylistResolverService} from './edit-playlist/edit-playlist-resolver.service'
import {NoPlaylistFoundComponent} from './no-playlist-found/no-playlist-found.component';
const routes: Routes = [
  {
    path: '', component: ViewPlaylistComponent, children:[
      {
        path: 'no-playlist', component: NoPlaylistFoundComponent, pathMatch:'full'
      },
      {
        path:':userId', component: PlaylistListComponent, resolve:{
          playlists: PlaylistResolverService
        }
      },
      {
        path: ':userId/:playlistId/edit', component: EditPlaylistComponent, resolve :{
          playlist: EditPlaylistResolverService
        }
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewPlaylistRoutingModule { }
