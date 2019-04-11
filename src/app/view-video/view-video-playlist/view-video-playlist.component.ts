import { Component, OnInit,Input } from '@angular/core';
import {ApiCallsService} from '../../services/api-calls.service'
@Component({
  selector: 'app-view-video-playlist',
  templateUrl: './view-video-playlist.component.html',
  styleUrls: ['./view-video-playlist.component.css']
})
export class ViewVideoPlaylistComponent implements OnInit {
  @Input('data') private playlist;
  @Input('video') private videoData;
  // private objectValues = Object.values;
  orderList(data:any[]){
    return data.sort((a,b)=>{
      return a.ordered - b.ordered;
    })
  }
  getCurrentOrder(){
    let id = this.videoData.id;
    let order = this.playlist.playlist.filter((val)=>{
      return val.id === id;
    })[0].ordered;
    return order;
  }
  constructor(private service:ApiCallsService) { }

  ngOnInit() {
    this.playlist.playlist = Object.values(this.playlist.playlist);
    this.playlist.playlist.forEach((val:any,ind)=>{
      val.ordered = ind + 1;
      val.thumbnail = this.service.getVideoThumbnail(val.id);
      val.url = "/view/"+val.id;
    })
    // console.log(this.playlist);
  }

}
