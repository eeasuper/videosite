import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../profile.service';
@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.css']
})
export class ProfileHomeComponent implements OnInit {
  private recentVideosTitle = "Uploaded Recently"
  private recentVideos;
  constructor(private profile:ProfileService) { }

  ngOnInit() {
    this.recentVideos = this.profile.recentVideos;
  }

}
