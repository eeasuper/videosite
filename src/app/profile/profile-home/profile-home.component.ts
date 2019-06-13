import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../profile.service';
@Component({
  selector: 'app-profile-home',
  template: `<app-video-list [data]="recentVideos" [title]="recentVideosTitle"></app-video-list>
    <div *ngIf="noVideos" class="noVideo">
      This user has no videos!
    </div>
  `,
  styles: [':host{width: 100%; height: 100%; display: inline-block; margin-top: 20px;}',
  '.noVideo{display:block; text-align:center}']
})
export class ProfileHomeComponent implements OnInit {
  public recentVideosTitle = "Uploaded Recently"
  public recentVideos;
  noVideos:boolean;
  constructor(private profile:ProfileService) { }

  ngOnInit() {
    this.recentVideos = this.profile.recentVideos;
    if(this.recentVideos.length === 0 ){
      this.noVideos = true;
    }else{
      this.noVideos = false;
    }
  }

}
