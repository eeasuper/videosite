import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-video-list-tab',
  templateUrl: './video-list-tab.component.html',
  styleUrls: ['./video-list-tab.component.css']
})
export class VideoListTabComponent implements OnInit {

  @Input('value') value:object;
  @Input('index') index:number;

  constructor() { }

  ngOnInit() {
  }

}
