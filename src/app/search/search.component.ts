import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PageEvent} from '@angular/material';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit,OnDestroy {
  public videos;
  public length;
  public pageSize = 5;
  public pageSizeOptions:number[] = [5,10,25,100];
  public pageIndex = 0;
  private routeSubscription:Subscription;
  nextPage(e:PageEvent){
    this.pageIndex = e.pageIndex;
  }

  constructor(private route: ActivatedRoute,) { }

  ngOnInit() {
    this.routeSubscription = this.route.data.subscribe((data: { search: any }) => {
      if(data.search){
        this.length = data.search.length;
        this.videos = data.search;
      }
    });
  }
  ngOnDestroy(){
    this.routeSubscription.unsubscribe();
  }
}
