import { Component, OnInit,Input,HostListener,Renderer2,ElementRef,ViewChild} from '@angular/core';
import {SidebarService} from '../services/sidebar.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  @ViewChild('videosContainer') private videoCon:ElementRef;
  @Input('data') private data:any;
  private objectValues = Object.values;
  private debounce:number = 0;
  private numOfVid:number;

  // getMarginLeft(isSidebarOpen:boolean){
  //   let windowWidth = window.innerWidth;
  //   let sb = 0;
  //   //sb & isSidbarOpen might be unnecessary...(check later)
  //   if(isSidebarOpen){sb = 200}
  //   this.numOfVid = Math.floor((windowWidth - sb)/210);
  //   let remainderWidth = this.numOfVid*210 + sb;
  //   // let nextRemainderWidth = ((this.numOfVid-1)*210) + sb;
  //   let mgLeft = (((windowWidth - remainderWidth)/210)*0.075) *100;
  //   if(this.numOfVid >= this.objectValues(this.data.list).length){
  //     return 0;
  //   }
  //   // if(!isSidebarOpen){
  //   //   return (((windowWidth - remainderWidth)/210)*0.075) *100;
  //   //   // return 0;
  //   // }
  //   return mgLeft;
  // }

  @HostListener('window:resize', ['$event'])
  limitVideos(){
    let windowWidth = window.innerWidth;
    if(this.debounce === 0){
      this.debounce = window.setTimeout(()=>{
        let sb = 0;
        if(this.isSidebarOpen){
          sb = 200;
        }
        [1260,1050,840,630,420].forEach((val, ind, arr)=>{
          if(windowWidth < val + sb && windowWidth > arr[ind+1] + sb){
            this.renderer.setStyle(this.videoCon.nativeElement, 'width', arr[ind+1] + 'px');
          }
        })
        // let mgLeft = this.getMarginLeft(this.isSidebarOpen);
        // this.renderer.setStyle(this.videoCon.nativeElement, 'margin-left', mgLeft+'rem');
        this.debounce = 0;
      },300);
    }

  }
  private isOverflowing;
  private isSidebarOpen;

  constructor(private renderer:Renderer2,private element:ElementRef,private sidebar:SidebarService) { }

  ngOnInit() {
    this.sidebar.change.asObservable().subscribe(isOpen=>{
      this.isSidebarOpen = isOpen;
    })
    this.limitVideos()
  }

}