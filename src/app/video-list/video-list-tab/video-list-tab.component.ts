import { Component, OnInit,Input,OnChanges,ElementRef,Renderer2 } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-video-list-tab',
  templateUrl: './video-list-tab.component.html',
  styleUrls: ['./video-list-tab.component.css']
})
export class VideoListTabComponent implements OnInit,OnChanges {

  @Input('value') video:object;

  constructor(private renderer:Renderer2,private element:ElementRef) { }

  ngOnInit() {
  }

  ngOnChanges(){
    
  }
}
