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
  public videos;
  public length;
  public pageSize = 5;
  public pageSizeOptions:number[] = [5,10,25,100];
  public pageIndex = 0;
  pageEvent: PageEvent;
  nextPage(e:PageEvent){
    this.pageIndex = e.pageIndex;
  }

  constructor(private route: ActivatedRoute) { }
  //https://material.angular.io/components/paginator/overview
  ngOnInit() {
    //=====you could improve this by reading the query param and set page index accordingly.
    this.route.data.subscribe((data: { videos: any }) => {
      if(data.videos){
        this.length = data.videos.length;
        this.videos = data.videos;
      }

    });
  }

}
