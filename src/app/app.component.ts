import { Component,HostBinding,OnInit,ViewChild,ElementRef,Renderer2,OnChanges} from '@angular/core';
import {VideoService} from './video-service.service';
import {ApiCallsService} from './services/api-calls.service';
import {SidebarService} from './services/sidebar.service';
import {Observable} from 'rxjs'
import {WindowSizeDirective} from './directives/window-size.directive'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // title = 'video-site-app';
  // videoData:any;


  constructor(private videoServ:VideoService, private service:ApiCallsService, private renderer:Renderer2){}

  ngOnInit(){
    this.service.validateDecodeJWT();
  }



}
//https://coolors.co/f1f2eb-d8dad3-a4c2a5-566246-4a4a48