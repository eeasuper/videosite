import { Component, OnInit } from '@angular/core';
import {ApiCallsService} from '../services/api-calls.service';
import { ActivatedRoute, Router } from '@angular/router';
import {SafeUrl, DomSanitizer} from '@angular/platform-browser';
import {Video,Videos} from '../Video';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public randomList:Video[];
  public randomVideoTitle:string = "Recommended";
  public randomList2:Video[];
  public randomVideoTitle2:string = "More Recommended";
  constructor(private api:ApiCallsService,private route: ActivatedRoute, private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.route.data.subscribe((data:{videoList:Videos})=>{
      this.randomList = data.videoList[0];
      this.randomList2 = data.videoList[1];
    })
  }
}