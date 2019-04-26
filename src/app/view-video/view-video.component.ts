import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Video} from './Video';
import {ApiCallsService} from '../services/api-calls.service';
@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.css']
})
export class ViewVideoComponent implements OnInit {
  @ViewChild('videoPlayer') private video:ElementRef;
  // private video:HTMLVideoElement = this.v.nativeElement;
  public currentVideo;
  public playlist;
  public videoSource;
  //
  constructor(private router:Router,private route: ActivatedRoute, private service:ApiCallsService) { }

  doClick(){
    console.log('clicked');
  }

  onEnded(){
    if(this.playlist){
      let currentVid = this.playlist.playlist.filter((val)=>{
        return val.id === this.currentVideo.id;
      })[0];
      let nextVideo;
      this.playlist.playlist.map((val,ind,arr)=>{
        if(val.id === this.currentVideo.id){
          nextVideo = arr[ind +1];
        }
      })
      if(!nextVideo){
        return;
      }
      this.router.navigate(['/view',nextVideo.id], {queryParams: {playlist: this.playlist.id}});
    }
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { video:Video }) => {
        // this.currentVideo = data.video;
        // console.log(data);
        this.currentVideo = data.video[2] || data.video;
        console.log(data.video);
        this.currentVideo.view = (data.video[1] != null)? data.video[1]: -1;
        this.videoSource = this.service.getVideoSource(this.currentVideo.id);
        //========load() is called so that video is loaded with new src when data is updated.
        this.video.nativeElement.load();
        const options = {year: 'numeric', month: 'long', day: 'numeric'}
        this.currentVideo.date = new Date(this.currentVideo.date).toLocaleDateString("en-US", options);
        this.playlist = (data.video[3] != null) ? data.video[3] : null;
        // if(data.video[1]){
        //   this.playlist = data.video[1];
        // }else{
        //   this.playlist = null;
        // }
    });
    // console.log(this.router.getCurrentNavigation().extras.state);
    // console.log(window.history.state);
  }

}
