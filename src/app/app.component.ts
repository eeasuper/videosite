import { Component } from '@angular/core';
import {VideoService} from './video-service.service';
import {ApiCallsService} from './services/api-calls.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'video-site-app';
  videoData:any;

  constructor(private videoServ:VideoService, private api:ApiCallsService){}

  test(){
    this.api.setViewCount("yui-ura-on.mp4");
  }

  getData(){
    this.videoServ.getVideo().subscribe((data)=>{
      this.videoData = data;
    })
  }

}
//https://coolors.co/f1f2eb-d8dad3-a4c2a5-566246-4a4a48