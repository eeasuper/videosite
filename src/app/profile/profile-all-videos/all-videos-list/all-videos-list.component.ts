import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-all-videos-list',
  templateUrl: './all-videos-list.component.html',
  styleUrls: ['./all-videos-list.component.css']
})
export class AllVideosListComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { videos: any }) => {
      if(data.videos){console.log(data.videos)}
    });
  }

}
