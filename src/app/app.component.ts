import { Component,HostBinding,OnInit,ViewChild,ElementRef,Renderer2,OnChanges} from '@angular/core';
import {VideoService} from './video-service.service';
import {ApiCallsService} from './services/api-calls.service';
import {SidebarService} from './services/sidebar.service';
import {Observable} from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnChanges{
  // title = 'video-site-app';
  // videoData:any;


  constructor(private videoServ:VideoService, private api:ApiCallsService, private renderer:Renderer2){}

  ngOnInit(){
  }

  ngOnChanges(){
    // if(this.isOpen){
    //   this.renderer.addClass(this.pageContainer.nativeElement, 'is-open');
    // }else{
    //   this.renderer.removeClass(this.pageContainer.nativeElement, 'is-open');
    // }
  }

  test(){
    this.api.setViewCount("yui-ura-on.mp4");
  }

  getData(){
    // this.videoServ.getVideo().subscribe((data)=>{
    //   this.videoData = data;
    // })
  }

}
//https://coolors.co/f1f2eb-d8dad3-a4c2a5-566246-4a4a48