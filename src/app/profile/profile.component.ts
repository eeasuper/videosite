import { Component, OnInit,OnDestroy,ChangeDetectionStrategy,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {DialogUploadComponent} from '../reusable-components/dialog-upload/dialog-upload.component';
import {DialogCreatePlaylistComponent} from '../reusable-components/dialog-create-playlist/dialog-create-playlist.component';
import {ProfileService} from './profile.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-profile',
  template: `<app-dumb-profile [user]="user" [authorized]="authorized" (openUploadDialog)="openUploadDialog()" 
    (openPlaylistDialog)="openPlaylistDialog()"></app-dumb-profile>`,
  styles: [':host{width:100%;}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit,OnDestroy{
  public user;
  public authorized:boolean=false;
  private loggedInUserId:number;
  private subscriptions:Subscription = new Subscription();
  constructor(private router:Router,private route: ActivatedRoute,private store:Store<any>,public dialog: MatDialog,private profile:ProfileService) { }

  openUploadDialog():void{
    this.dialog.open(DialogUploadComponent, {
      data: {
        userId: this.loggedInUserId
      }
    });
  }

  openPlaylistDialog():void{
    this.dialog.open(DialogCreatePlaylistComponent,{
      data:{
        userId:this.loggedInUserId
      }
    })
  }

  ngOnInit() {
    this.subscriptions.add(this.route.data
      .subscribe((data: { data: any }) => {
        this.user = data.data[1];
        this.profile.recentVideos = data.data[0];
        this.profile.userId = this.user.id;
    }));
    this.subscriptions.add(this.store.select('user').subscribe(user=>{
      let userId = parseInt(this.route.snapshot.paramMap.get('userId'));
      if(!user.isAuthenticated){
        this.authorized = false;
      }else if(user.isAuthenticated){
        this.authorized = (userId === user.user.id)?true:false;
        this.loggedInUserId = user.user.id;
      }
    }))
  }
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}
