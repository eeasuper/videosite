import { Component, OnInit,Input,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dumb-view-video-playlist',
  templateUrl: './dumb-view-video-playlist.component.html',
  styleUrls: ['./dumb-view-video-playlist.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DumbViewVideoPlaylistComponent implements OnInit {
  @Input('videoData') videoData;
  @Input('playlist') playlist;

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
  constructor() { }

  ngOnInit() {
  }

}
