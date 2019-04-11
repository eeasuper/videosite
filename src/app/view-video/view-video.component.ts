import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Video} from './Video';
import {ApiCallsService} from '../services/api-calls.service';
@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.css']
})
export class ViewVideoComponent implements OnInit {
  private currentVideo;
  private playlist;
  private videoSource;
  //
  constructor(private router:Router,private route: ActivatedRoute, private service:ApiCallsService) { }

  doClick(){
    console.log('clicked');
  }

  onEnded(){
    if(this.playlist){
      let currentOrder = this.playlist.list.filter((val)=>{
        return val.id === this.currentVideo.id;
      })[0].order
      let nextVideo = this.playlist.list.filter((val)=>{
        return currentOrder + 1 === val.order;
      })[0];
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
        this.currentVideo = data.video[0];
        this.videoSource = this.service.getVideoSource(this.currentVideo.id);
        const options = {year: 'numeric', month: 'long', day: 'numeric'}
        this.currentVideo.date = new Date(this.currentVideo.date).toLocaleDateString("en-US", options);
        if(data.video[1]){
          this.playlist = data.video[1];
          // console.log(this.playlist);
        }else{
          this.playlist = null;
        }
    });
    // console.log(this.router.getCurrentNavigation().extras.state);
    // console.log(window.history.state);
  }

}
