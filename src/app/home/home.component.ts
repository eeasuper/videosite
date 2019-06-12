import { Component, OnInit,OnDestroy} from '@angular/core';
import {ApiCallsService} from '../services/api-calls.service';
import { ActivatedRoute, Router } from '@angular/router';
import {SafeUrl, DomSanitizer} from '@angular/platform-browser';
import {Video,Videos} from '../Video';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  public randomList:Video[];
  public randomVideoTitle:string = "Recommended";
  public randomList2:Video[];
  public randomVideoTitle2:string = "More Recommended";
  private routeSubscription:Subscription;
  constructor(private api:ApiCallsService,private route: ActivatedRoute, private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.routeSubscription = this.route.data.subscribe((data:{videoList:Videos})=>{
      this.randomList = data.videoList[0];
      this.randomList2 = data.videoList[1];
    })
  }

  ngOnDestroy(){
    this.routeSubscription.unsubscribe();
  }
}