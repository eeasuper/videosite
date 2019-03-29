import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Video} from './Video';

@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.css']
})
export class ViewVideoComponent implements OnInit {
  private data;

  //
  constructor(private router:Router,private route: ActivatedRoute) { }

  doClick(){
    console.log('clicked');
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { video:Video }) => {
        this.data = data.video;
        const options = {year: 'numeric', month: 'long', day: 'numeric'}
        this.data.published_date = new Date(this.data.published_date).toLocaleDateString("en-US", options);
    });
  }

}
