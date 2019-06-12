import { Component, OnInit,Inject,OnDestroy,ChangeDetectionStrategy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Playlist} from '../../Playlist';
import {Observable,Subscription,timer} from 'rxjs';
import {ApiCallsService} from '../../services/api-calls.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {DialogCloseComponent} from '../../reusable-components/dialog-close/dialog-close.component';
import {DialogAddVideoPlaylistComponent} from '../../reusable-components/dialog-add-video-playlist/dialog-add-video-playlist.component';

@Component({
  selector: 'app-edit-playlist',
  template: `<app-dumb-edit-playlist [playlist]="playlist" [mainThumbnail]="mainThumbnail" 
    (openDD)="openDeleteDialog()" (openAD)="openAddDialog()" (setPT)="setPlaylistTitle($event)" 
    (saveChanges)="saveChanges($event)"></app-dumb-edit-playlist>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPlaylistComponent implements OnInit,OnDestroy{
  public playlist:Playlist;
  public mainThumbnail:string;
  private routeSubscription: Subscription;

  constructor(private router:Router,private route: ActivatedRoute, public dialog: MatDialog, private service:ApiCallsService) { }

  openDeleteDialog():void{
    this.dialog.open(DialogCloseComponent, {
      data: {
        type: 'playlist',
        id: this.playlist.id
      }
    });
  }

  openAddDialog():void{
    this.dialog.open(DialogAddVideoPlaylistComponent,{
      data:{
        id: this.playlist.id,
      }
    });
  }

  saveChanges(playlist:any):void{
    this.service.setPlaylistOrder(playlist);
  }

  setPlaylistTitle(newTitle:PlaylistTitle){
    this.service.setPlaylistTitle(newTitle.playlistId,newTitle.newTitle);
  }

  ngOnInit() {
    this.routeSubscription = this.route.data
      .subscribe((data: { playlist: Playlist }) => {
        this.playlist = data.playlist;
        this.mainThumbnail = this.playlist.playlist[0].thumbnail;
    });
  }
  ngOnDestroy(){
    this.routeSubscription.unsubscribe();
  }
}

export interface PlaylistTitle{
  playlistId: number;
  newTitle: string;
}