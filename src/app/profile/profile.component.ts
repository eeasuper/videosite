import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {User} from './User'
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private user;
  private recentVideo;
  private recentVideoTitle:string = "Uploaded Recently";
  //data is for video list.
  constructor(private router:Router,private route: ActivatedRoute,private store:Store<any>) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { data: any }) => {
        console.log(data.data);
        this.user = data.data[1];
        this.recentVideo = data.data[0];
        // this.recentVideo = data.data.recentVideoList;
        console.log(this.recentVideo);
        // this.user = data.data.user;
    });

    console.log(this.user);
  }

}
