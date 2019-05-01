import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PageEvent} from '@angular/material';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public videos;
  public length;
  public pageSize = 5;
  public pageSizeOptions:number[] = [5,10,25,100];
  public pageIndex = 0;
  nextPage(e:PageEvent){
    this.pageIndex = e.pageIndex;
  }

  constructor(private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.data.subscribe((data: { search: any }) => {
      if(data.search){
        this.length = data.search.length;
        this.videos = data.search;
      }
    });
  }

}
