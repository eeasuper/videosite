import { Component, OnInit,Input,OnChanges,ElementRef,Renderer2,ChangeDetectionStrategy } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-video-list-tab',
  templateUrl: './video-list-tab.component.html',
  styleUrls: ['./video-list-tab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoListTabComponent implements OnInit,OnChanges {

  @Input('value') public video:any;

  constructor(private renderer:Renderer2,private element:ElementRef) { }

  ngOnInit() {
  }

  ngOnChanges(){
    
  }
}
