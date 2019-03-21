import { Component, OnInit,Input,HostListener,Renderer2,ElementRef,ViewChild} from '@angular/core';
import {SidebarService} from '../services/sidebar.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  @ViewChild('videosContainer') private videoCon:ElementRef;
  @ViewChild('videosContainer3') private videoCon3:ElementRef;
  @Input('data') private data:any;
  private objectValues = Object.values;
  private debounce:number = 0;
  private width:number;

  handleClick(direction){
    let width = this.width;
    let data = this.data;

    this.renderer.setStyle(this.videoCon3.nativeElement,'transform',
      'translateX(' + getDirection()+getTranslateValue(this.renderer,this.videoCon3.nativeElement)+'px'+ ')');

    function getDirection(){
      if(direction === "left"){
        return '';
      }else{
        return '-';
      }
    }
    
    function getTranslateValue(renderer,element){
      let videoNum = getVideoNum(width);
      //videoNum gives the current number of videos displayed on screen.
      let totalNum = Object.values(data.list).length;
      //totalNum gives the total number of videos in the list, videoCon2.
      let totalWindows = Math.ceil(totalNum/videoNum);
      //totalWindows gives the total number of 'windows' to exist for all videoes to get displayed by scrolling.
      let state = parseInt(element.dataset.state);
      if(totalNum/videoNum>2){
        if(direction ==="right"){
          if(state != 1 && state){
            console.log(totalWindows);
            if(totalWindows - state != 0){
              state+=1;
              setAttribute(state);
              console.log(state + " "+ videoNum);
              return (videoNum * (state-1)) * 210;
            }else if(totalWindows - state === 0){
              console.log("disable right button");
              return (videoNum * (state-1)) * 210;
            }
          }
          state = 2;
          setAttribute(state);
          return videoNum * 210;          
        }
        if(direction ==="left"){
          if(state !=1 && state){
            console.log(state + " "+ videoNum);
            if(state != 2 && state){
              console.log(state + " "+ videoNum);
              state -= 1;
              setAttribute(state);
              return -(videoNum * 210);
            }
          }
          state =1;
          setAttribute(state);
          return 0;
        }

      } 
      if(direction==="right"){
        let multiplier = totalNum - videoNum;
        return multiplier * 210;  
      }
      if(direction ==="left"){
        return 0;
      }
      function setAttribute(state){
        renderer.setAttribute(element,'data-state',state);
      }
    }

    function getVideoNum(width){
      let num;
      switch(width){
        case 1260:
          num = 6;
          break;
        case 1050:
          num = 5;
          break;
        case 840:
          num = 4;
          break;
        case 630:
          num = 3;
          break;
        case 420:
          num =2;
          break;
        case 210:
          num = 1;
          break;
      }
      return num;
    }
  }


  @HostListener('window:resize', ['$event'])
  limitVideos(){
    let windowWidth = window.innerWidth;
    if(this.debounce === 0){
      this.debounce = window.setTimeout(()=>{
        let sb = 0;
        if(this.isSidebarOpen){
          sb = 200;
        }
        [1260,1050,840,630,420,210].forEach((val, ind, arr)=>{
          if(windowWidth < val + sb && windowWidth > arr[ind+1] + sb){
            this.width = arr[ind+1];
            this.renderer.setStyle(this.videoCon.nativeElement, 'width', this.width + 'px');
          }
        })
        // let mgLeft = this.getMarginLeft(this.isSidebarOpen);
        // this.renderer.setStyle(this.videoCon.nativeElement, 'margin-left', mgLeft+'rem');
        this.debounce = 0;
      },200);
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

/*
//=========================code below took me 4~5 hours to do... a waste to erase it!
//its function is to automatically set marginLeft to center the element inside.
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
*/