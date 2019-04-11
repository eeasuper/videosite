import { Component, OnInit } from '@angular/core';
import {ApiCallsService} from '../services/api-calls.service';
import { ActivatedRoute, Router } from '@angular/router';
import {SafeUrl, DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // public randomList:object = {
  //   h2: 'Recommended',
  //   list:[
  //     {
  //       h3: 'Yui-Ura-On!!!',
  //       thumbnail: '/assets/seeding-thumbnail.png',
  //       uploader: 'example uploader',
  //       views: 'example views'
  //     },
  //     {
  //       h3: 'Yui-Ura-On!!! 2',
  //       thumbnail: '/assets/seeding-thumbnail.png',
  //       uploader: 'example uploader2',
  //       views: 'example views2'
  //     },
  //     {
  //       h3: 'Yui-Ura-On!!! 3',
  //       thumbnail: '/assets/seeding-thumbnail.png',
  //       uploader: 'example uploader3',
  //       views: 'example views3'
  //     },
  //     {
  //       h3: 'Yui-Ura-On!!! 3',
  //       thumbnail: '/assets/seeding-thumbnail.png',
  //       uploader: 'example uploader3',
  //       views: 'example views3'
  //     },
  //     {
  //       h3: 'Yui-Ura-On!!! 3',
  //       thumbnail: '/assets/seeding-thumbnail.png',
  //       uploader: 'example uploader3',
  //       views: 'example views3'
  //     },
  //     {
  //       h3: 'Yui-Ura-On!!! 6',
  //       thumbnail: '/assets/seeding-thumbnail.png',
  //       uploader: 'example uploader3',
  //       views: 'example views3'
  //     }
  //   ]
  // }
  // private server:string = "http://localhost:8080/video/"
  private randomList:ListData = {
    h2: 'Recommended',
    list:[
    ]
  };

  constructor(private api:ApiCallsService,private route: ActivatedRoute, private sanitizer:DomSanitizer) { }

  ngOnInit() {
    //https://stackoverflow.com/questions/38558977/angular2-imgcache-unsafe-url
    // this.route.data.subscribe((data:{videoLists:object[]})=>{
      this.route.data.subscribe((data:{videoLists:object[]})=>{
      data.videoLists.forEach((val:any,ind)=>{
        let video:VideoInList = {
          h3: val.h3,
          // thumbnail: this.sanitizer.bypassSecurityTrustUrl(this.server + val.id+"/thumbnail"),
          thumbnail: val.thumbnail,
          uploader: val.uploader,
          views: val.views,
          // date: this.convertTimetoDate(val.date)
          date: val.date
        }
        this.randomList.list.push(video);
      })
    })
    
  }

  convertTimetoDate(time:number):string{
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    return new Date(time).toLocaleDateString("en-US", options);
  }
}

export interface ListData {
  h2: string;
  list: VideoInList[];
}

export interface VideoInList{
  h3: string;
  // thumbnail: SafeUrl;
  thumbnail: string;
  uploader: string;
  //make views number later...(if possible, now)
  views: string;
  //I should also add uploaded date...
  date: string;
}