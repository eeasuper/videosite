import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../profile.service';
@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.css']
})
export class ProfileHomeComponent implements OnInit {
  public recentVideosTitle = "Uploaded Recently"
  public recentVideos;
  constructor(private profile:ProfileService) { }

  ngOnInit() {
    this.recentVideos = this.profile.recentVideos;
  }

}
