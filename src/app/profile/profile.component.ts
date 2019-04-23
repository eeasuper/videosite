import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {User} from './User'
import { Store } from '@ngrx/store';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {DialogUploadComponent} from '../reusable-components/dialog-upload/dialog-upload.component';
import {DialogCreatePlaylistComponent} from '../reusable-components/dialog-create-playlist/dialog-create-playlist.component';
import {ProfileService} from './profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private user;
  private recentVideo;
  private recentVideoTitle:string = "Uploaded Recently";
  private authorized:boolean=false;
  private loggedInUserId:number;
  constructor(private router:Router,private route: ActivatedRoute,private store:Store<any>,public dialog: MatDialog,private profile:ProfileService) { }

  openUploadDialog():void{
    this.dialog.open(DialogUploadComponent, {
      data: {
        user: this.loggedInUserId
      }
    });
  }

  openPlaylistDialog():void{
    this.dialog.open(DialogCreatePlaylistComponent,{
      data:{
        user:this.loggedInUserId
      }
    })
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { data: any }) => {
        this.user = data.data[1];
        // this.recentVideo = data.data[0];
        this.profile.recentVideos = data.data[0];
        this.profile.userId = this.user.id;
    });
    this.store.select('user').subscribe(user=>{
      let userId = parseInt(this.route.snapshot.paramMap.get('userId'));
      if(!user.isAuthenticated){
        this.authorized = false;
      }else if(user.isAuthenticated){
        this.authorized = (userId === user.user.id)?true:false;
        this.loggedInUserId = user.user.id;
      }
    })
  }

}
