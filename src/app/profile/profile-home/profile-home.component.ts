import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../profile.service';
@Component({
  selector: 'app-profile-home',
  template: `<app-video-list [data]="recentVideos" [title]="recentVideosTitle"></app-video-list>`,
  styles: [':host{width: 100%; height: 100%; display: inline-block; margin-top: 20px;}']
})
export class ProfileHomeComponent implements OnInit {
  public recentVideosTitle = "Uploaded Recently"
  public recentVideos;
  constructor(private profile:ProfileService) { }

  ngOnInit() {
    this.recentVideos = this.profile.recentVideos;
  }

}
