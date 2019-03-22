import { Component, OnInit } from '@angular/core';
// import {WindowSizeDirective} from '../directives/window-size.directive'

@Component({
  selector: 'app-view-playlist',
  templateUrl: './view-playlist.component.html',
  styleUrls: ['./view-playlist.component.css']
})
export class ViewPlaylistComponent implements OnInit {

  private playlistList:object = {
    playlist1:{
      name: 'exampleplaylist',
      created: 'December 1st 2018',
      list:{
        video1:{
          h3: 'Yui-Ura-On!!!',
          thumbnail: '/assets/seeding-thumbnail.png',
          uploader: 'example uploader',
          views: 'example views',
          order: 1
        },
        video2:{
          h3: 'Yui-Ura-On!!! 2',
          thumbnail: '/assets/seeding-thumbnail.png',
          uploader: 'example uploader2',
          views: 'example views2',
          order: 3
        },
        video3:{
          h3: 'Yui-Ura-On!!! 3',
          thumbnail: '/assets/seeding-thumbnail.png',
          uploader: 'example uploader3',
          views: 'example views3',
          order: 2
        }
      }
    },
    playlist2:{
      name: 'exampleplaylist2',
      created: 'December 2nd 2018',
      list:{
        video1:{
          h3: 'Yui-Ura-On!!!',
          thumbnail: '/assets/seeding-thumbnail.png',
          uploader: 'example uploader',
          views: 'example views',
          order: 3
        },
        video2:{
          h3: 'Yui-Ura-On!!! 2',
          thumbnail: '/assets/seeding-thumbnail.png',
          uploader: 'example uploader2',
          views: 'example views2',
          order: 2
        },
        video3:{
          h3: 'Yui-Ura-On!!! 3',
          thumbnail: '/assets/seeding-thumbnail.png',
          uploader: 'example uploader3',
          views: 'example views3',
          order: 1
        }
      }
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
