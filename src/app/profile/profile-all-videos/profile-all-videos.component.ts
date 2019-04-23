import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../profile.service';
import {ActivatedRoute} from '@angular/router';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-profile-all-videos',
  templateUrl: './profile-all-videos.component.html',
  styleUrls: ['./profile-all-videos.component.css']
})
export class ProfileAllVideosComponent implements OnInit {
  //https://material.angular.io/components/paginator/examples
  private videos;
  private length;
  private pageSize = 5;
  private pageSizeOptions:number[] = [5,10,25,100];
  private pageIndex = 0;
  pageEvent: PageEvent;
  test(e:PageEvent){
    this.pageIndex = e.pageIndex;
    console.log(e);
  }

  constructor(private profile:ProfileService,private route: ActivatedRoute) { }
  //https://material.angular.io/components/paginator/overview
  ngOnInit() {
    //=====you could improve this by reading the query param and set page index accordingly.
    this.route.data.subscribe((data: { videos: any }) => {
      if(data.videos){
        console.log(data.videos)
        this.length = data.videos.length;
        this.videos = data.videos;
      }

    });
  }

}
