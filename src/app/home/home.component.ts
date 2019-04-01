import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public videoListSection1:object = {
    h2: 'Recommended',
    list:[
      {
        h3: 'Yui-Ura-On!!!',
        thumbnail: '/assets/seeding-thumbnail.png',
        uploader: 'example uploader',
        views: 'example views'
      },
      {
        h3: 'Yui-Ura-On!!! 2',
        thumbnail: '/assets/seeding-thumbnail.png',
        uploader: 'example uploader2',
        views: 'example views2'
      },
      {
        h3: 'Yui-Ura-On!!! 3',
        thumbnail: '/assets/seeding-thumbnail.png',
        uploader: 'example uploader3',
        views: 'example views3'
      },
      {
        h3: 'Yui-Ura-On!!! 3',
        thumbnail: '/assets/seeding-thumbnail.png',
        uploader: 'example uploader3',
        views: 'example views3'
      },
      {
        h3: 'Yui-Ura-On!!! 3',
        thumbnail: '/assets/seeding-thumbnail.png',
        uploader: 'example uploader3',
        views: 'example views3'
      },
      // video6:{
      //   h3: 'Yui-Ura-On!!! 3',
      //   thumbnail: '/assets/seeding-thumbnail.png',
      //   uploader: 'example uploader3',
      //   views: 'example views3'
      // }
    ]
  }

  constructor() { }

  ngOnInit() {
  }

}
