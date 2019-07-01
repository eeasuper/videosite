import { Component, OnInit,Input,ChangeDetectionStrategy } from '@angular/core';
import {ApiCallsService} from '../../services/api-calls.service'
@Component({
  selector: 'app-view-video-playlist',
  template: '<app-dumb-view-video-playlist [playlist]="playlist" [videoData]="videoData"></app-dumb-view-video-playlist>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewVideoPlaylistComponent implements OnInit {
  @Input('data') public playlist;
  @Input('video') public videoData;
  
  constructor(private service:ApiCallsService) { }

  ngOnInit() {
    this.playlist.playlist = Object.values(this.playlist.playlist);
    this.playlist.playlist.forEach((val:any,ind)=>{
      val.ordered = ind + 1;
      val.thumbnail = this.service.getVideoThumbnail(val.id);
      val.url = "/view/"+val.id;
    })
  }

}
