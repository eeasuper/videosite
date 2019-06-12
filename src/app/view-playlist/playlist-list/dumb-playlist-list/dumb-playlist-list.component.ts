import { Component, OnInit,Input,Renderer2,ChangeDetectionStrategy } from '@angular/core';
import {Playlist} from '../../../Playlist';
@Component({
  selector: 'app-dumb-playlist-list',
  templateUrl: './dumb-playlist-list.component.html',
  styleUrls: ['./dumb-playlist-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DumbPlaylistListComponent implements OnInit {
  @Input('loggedInId') loggedInId:number;
  @Input('playlists') playlists:Playlist[];    

  mouseenterList(e){
    let parent = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    this.renderer.setStyle(parent,'overflow','visible');
    this.renderer.setStyle(parent,'z-index','2');
  }

  mouseleaveList(e){
    let parent = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    this.renderer.setStyle(parent,'overflow','hidden');
    this.renderer.setStyle(parent,'z-index','1');
  }

  getEditAuthorization(playlistUploaderId:number){
    if(playlistUploaderId === this.loggedInId){
      return true;
    }else{
      false;
    }
  }

  constructor(private renderer:Renderer2) { }

  ngOnInit() {
  }

}
