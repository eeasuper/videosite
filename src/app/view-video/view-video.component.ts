import { Component, OnInit,ViewChild,ElementRef,OnDestroy,ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Subscription} from 'rxjs';
import {Video} from '../Video';
import {ApiCallsService} from '../services/api-calls.service';

@Component({
  selector: 'app-view-video',
  template: `<app-dumb-view-video [currentVideo]="currentVideo" [playlist]="playlist" [videoSource]="videoSource" (onEnded)="onEnded()">
  </app-dumb-view-video>`,
  styles:[':host{min-width:90%;}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewVideoComponent implements OnInit,OnDestroy{
  @ViewChild('videoPlayer') private video:ElementRef;
  private routeSubscription:Subscription;
  public currentVideo;
  public playlist;
  public videoSource;
  constructor(private router:Router,private route: ActivatedRoute, private service:ApiCallsService) { }

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
    this.routeSubscription = this.route.data
      .subscribe((data: { video:Video }) => {
        this.currentVideo = data.video[2] || data.video;
        this.currentVideo.view = (data.video[1] != null)? data.video[1]: -1;
        this.videoSource = this.service.getVideoSource(this.currentVideo.id);
        const options = {year: 'numeric', month: 'long', day: 'numeric'}
        this.currentVideo.date = new Date(this.currentVideo.date).toLocaleDateString("en-US", options);
        this.playlist = (data.video[3] != null) ? data.video[3] : null;
    });
  }

  ngOnDestroy(){
    this.routeSubscription.unsubscribe();
  }

}
