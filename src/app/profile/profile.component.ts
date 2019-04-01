import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {User} from './User'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private user;
  private data;
  //data is for video list.
  constructor(private router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { user: User }) => {
        this.user = data.user;
        this.data = data.user.recent_uploads;
    });
    console.log(this.user);
  }

}
