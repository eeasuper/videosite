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
  private randomList:any[];
  private randomVideoTitle:string = "Recommended";
  constructor(private api:ApiCallsService,private route: ActivatedRoute, private sanitizer:DomSanitizer) { }

  ngOnInit() {
    //https://stackoverflow.com/questions/38558977/angular2-imgcache-unsafe-url
      this.route.data.subscribe((data:{videoList:any[]})=>{
        this.randomList = data.videoList;
    })
    
  }

  // convertTimetoDate(time:number):string{
  //   const options = {year: 'numeric', month: 'long', day: 'numeric'}
  //   return new Date(time).toLocaleDateString("en-US", options);
  // }
}

// export interface ListData {
//   h2: string;
//   list: VideoInList[];
// }

// export interface VideoInList{
//   h3: string;
//   // thumbnail: SafeUrl;
//   thumbnail: string;
//   uploader: string;
//   //make views number later...(if possible, now)
//   views: string;
//   //I should also add uploaded date...
//   date: string;
// }