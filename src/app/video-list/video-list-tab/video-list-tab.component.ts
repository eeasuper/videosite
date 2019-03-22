import { Component, OnInit,Input,OnChanges,ElementRef,Renderer2 } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-video-list-tab',
  templateUrl: './video-list-tab.component.html',
  styleUrls: ['./video-list-tab.component.css']
})
export class VideoListTabComponent implements OnInit,OnChanges {

  @Input('value') value:object;
  @Input('videoId') videoId:number;
  @Input('videos') numOfVid:number;

  constructor(private renderer:Renderer2,private element:ElementRef) { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.videoId >= this.numOfVid){
      // this.renderer.setStyle(this.element.nativeElement, 'transform', 
        // 'translate(' + ((this.videoId -1) * 100)+'%'+',-130%)');
      // this.renderer.setStyle(this.element.nativeElement, 'visibility', 'hidden');
      // this.renderer.setStyle(this.element.nativeElement, 'position', 'absolute');
    }
  }
}
