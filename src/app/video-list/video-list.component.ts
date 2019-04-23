import { Component, OnInit,Input,HostListener,Renderer2,ElementRef,ViewChild,ChangeDetectorRef} from '@angular/core';
import {SidebarService} from '../services/sidebar.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  @ViewChild('videosContainer') private videoCon:ElementRef;
  // private videoCon:ElementRef;
  // @ViewChild('videosContainer') set videoConSetter(content: ElementRef) {
  //   this.videoCon = content;
  // }
  @ViewChild('videosContainer3') private videoCon3:ElementRef;
  // private videoCon3:ElementRef;
  // @ViewChild('videosContainer3') set videoCon3Setter(content: ElementRef) {
  //   this.videoCon3 = content;
  // }
  @ViewChild('videosContainer3') private page:ElementRef;
  // private page:ElementRef;
  // @ViewChild('videosContainer3') set pageSetter(content: ElementRef) {
  //   this.page = content;
  // }
  @ViewChild('arrowsContainer') private arrows:ElementRef;
  // private arrows:ElementRef;
  // @ViewChild('arrowsContainer') set arrowsContainerSetter(content: ElementRef) {
  //   this.arrows = content;
  // }
  @Input('data') private data:any;
  @Input('title') private title:string;
  private objectValues = Object.values;
  private debounce:number = 0;
  private width:number;
  private totalPage:number = 0;
  private pageNum;

  getPageNum(){
    return this.videoCon3.nativeElement.dataset.state;
  }
  //===totalVideos gives the total number of videos in the list, videoCon2.
  getVideoNum(width){
    //getVideoNum gives the current number of videos displayed on screen.
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

  setTotalPage(){
    this.setWidth();      
    const videoNum = this.getVideoNum(this.width);
    //videoNum gives the current number of videos displayed on screen.
    const totalVideos = this.data.length;
    const totalWindows = Math.ceil(totalVideos/videoNum);
    this.totalPage = totalWindows;
    //totalWindows gives the total number of 'windows' to exist for all videoes to get displayed by scrolling.
    return totalWindows;
  }

  handleClick(direction){
    const width = this.width;
    const data = this.data;
    const videoNum = this.getVideoNum(this.width);
    //videoNum gives the current number of videos displayed on screen.
    const totalVideos = this.data.length;
    const totalWindows = Math.ceil(totalVideos/videoNum);
    //totalWindows gives the total number of 'windows' to exist for all videoes to get displayed by scrolling.

    this.renderer.setStyle(this.videoCon3.nativeElement,'transform',
      'translateX(' + getDirection()+getTranslateValue(this.renderer,this.videoCon3.nativeElement)+'px'+ ')');

    // this.renderer.setAttribute(this.page.nativeElement, 'data-state', this.videoCon3.nativeElement.dataset.state);

    function getDirection(){
      if(direction === "left"){
        return '';
      }else{
        return '-';
      }
    }
    
    function getTranslateValue(renderer,element){
      let state = parseInt(element.dataset.state);
      if(totalVideos/videoNum>2){
        if(direction ==="right"){
          if(state != 1 && state){
            if(totalWindows - state != 0){
              state+=1;
              setAttribute(state);
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
            if(state != 2 && state){
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
        let multiplier = totalVideos - videoNum;
        if(multiplier >0){
          setAttribute(2);  
        }
        return multiplier * 210;  
      }
      if(direction ==="left"){
        setAttribute(1);
        return 0;
      }
      function setAttribute(state){
        renderer.setAttribute(element,'data-state',state);
      }
    }
  }



  @HostListener('window:resize', ['$event'])
  limitVideos(){
    let windowWidth = window.innerWidth;
    if(this.debounce === 0){
      this.debounce = window.setTimeout(()=>{
        this.setWidth(this.videoCon.nativeElement);
        this.debounce = 0;
      },200);
    }
  }

  setWidth(element?:ElementRef){
    let windowWidth = window.innerWidth - 20;
    let sb = 0;
    if(this.isSidebarOpen){
      sb = 200;
    }
    [1260,1050,840,630,420,210].forEach((val, ind, arr)=>{

      if(windowWidth < val + sb && windowWidth > arr[ind+1] + sb){
        this.width = arr[ind+1];
        const videoNum = this.getVideoNum(this.width);
        const videoLength = this.data.length;
        if(element && (videoLength < videoNum)){
          this.renderer.setStyle(element, 'width', arr[(arr.length-videoLength)] + 10 +'px');
        }
        else if(element){
          this.renderer.setStyle(element, 'width', this.width + 10 +'px');
        }
      }
      else if(windowWidth >= val + sb && ind === 0){
        this.width = val;
        const videoNum = this.getVideoNum(this.width);
        const videoLength = this.data.length;
        if(element && (videoLength < videoNum)){
          this.renderer.setStyle(element, 'width', arr[(arr.length-videoLength)] + 10 +'px');
        }
        if(element){
          this.renderer.setStyle(element, 'width', arr[ind] + 10+'px');
        }
      }
    })
  }

  private isOverflowing;
  private isSidebarOpen = true;

  constructor(private renderer:Renderer2,private changeDetector : ChangeDetectorRef,private element:ElementRef,private sidebar:SidebarService) { }

  ngOnInit() {
    this.sidebar.change.asObservable().subscribe(isOpen=>{
      this.isSidebarOpen = isOpen;
      this.setWidth(this.videoCon.nativeElement);
      this.limitVideos();
    })        
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

          // let mgLeft = this.getMarginLeft(this.isSidebarOpen);
        // this.renderer.setStyle(this.videoCon.nativeElement, 'margin-left', mgLeft+'rem');
*/