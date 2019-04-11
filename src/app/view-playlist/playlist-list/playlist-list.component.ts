import { Component, OnInit,Input,HostListener,Renderer2,ElementRef,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Playlist,Playlists} from '../playlist';
import {PlaylistService} from '../../services/playlist.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {

  private playlists:any;    
  private objectValues = Object.values;
  private width;
  private authenticated:boolean;
  private loggedInId:number;
  // orderList(playlists:any[]){
  //   return playlists.sort((a,b)=>{
  //     return a.order - b.order;
  //   })
  // }

  // navigate(playlist:any){
  //   //maybe make interface instead of any later.
  //   this.router.navigate([playlist.list[0].url], {
  //     state: {
  //       playlist: playlist
  //     }
  //   })
  // }

  navigate(e: Event, playlist:any){
    e.preventDefault();
    
  }

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

  constructor(private store:Store<any>,private element:ElementRef,private renderer:Renderer2, private router:Router,private route: ActivatedRoute, private service:PlaylistService) { }
  
  getEditAuthorization(playlistUploaderId:number){
    if(playlistUploaderId === this.loggedInId){
      return true;
    }else{
      false;
    }
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { playlists: Playlists }) => {
        this.playlists = data.playlists;
    });
    this.store.select('user').subscribe(user=>{
      console.log(user);
      this.loggedInId = user.user.id      
      if(!user.isAuthenticated){
        this.authenticated = false;
      }else if(user.isAuthenticated){
        this.authenticated = true;
      }else{
        this.authenticated = false
      }
    })
  }

}
