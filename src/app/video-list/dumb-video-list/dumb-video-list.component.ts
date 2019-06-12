import { Component, OnInit,ViewChild,ElementRef,Input,ChangeDetectionStrategy,OnChanges,Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dumb-video-list',
  templateUrl: './dumb-video-list.component.html',
  styleUrls: ['./dumb-video-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DumbVideoListComponent implements OnInit,OnChanges {

  private width:number;
  public totalPage:number = 0;
  @ViewChild('videosContainer2') public videoCon2:ElementRef;
  @ViewChild('page') private page:ElementRef;
  @ViewChild('arrows') private arrows:ElementRef;
  @ViewChild('titleh2') private titleh2:ElementRef;
  @Input('update') public update:boolean;
  @Input('title') public title:string;
  @Input('videos') public videos;
  @Input('isSidebarOpen') public isSidebarOpen;
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
    const totalVideos = this.videos.length;
    const totalWindows = Math.ceil(totalVideos/videoNum);
    this.totalPage = totalWindows;
    //totalWindows gives the total number of 'windows' to exist for all videoes to get displayed by scrolling.
    return totalWindows;
  }

  handleClick(direction:string){
    const videoNum = this.getVideoNum(this.width);
    //videoNum gives the current number of videos displayed on screen.
    const totalVideos = this.videos.length;
    const totalWindows = Math.ceil(totalVideos/videoNum);
    //totalWindows gives the total number of 'windows' to exist for all videoes to get displayed by scrolling.

    this.renderer.setStyle(this.videoCon2.nativeElement,'transform',
      'translateX(' + this.getDirection(direction)+this.getTranslateValue(this.videoCon2.nativeElement,direction,totalVideos,videoNum,totalWindows)+'px'+ ')');
  }

  getDirection(direction:string){
    if(direction === "left"){
      return '';
    }else{
      return '-';
    }
  }

  getTranslateValue(element:HTMLElement,direction:string,totalVideos:number,videoNum:number,totalWindows:number){
    let state = parseInt(element.dataset.state);
    //state indicates the page number it is currently in. 1 is a special number because it is the first page.
    if(totalVideos/videoNum>2){
      if(direction ==="right"){
        if(state != 1 && state){
          //when page number is not the first page and page number exists.
          if(totalWindows - state != 0){
            //when it is not the last page. For ex. 6/6.
            state+=1;
            this.setAttribute(state,element);
            return (videoNum * (state-1)) * 210;
          }else if(totalWindows - state === 0){
            //when it IS the last page.
            return (videoNum * (state-1)) * 210;
          }
        }
        //move the first page to the second page otherwise.
        state = 2;
        this.setAttribute(state,element);
        return videoNum * 210;          
      }
      if(direction ==="left"){
        if(state !=1 && state){
          //when page number is not the first page and page number exists.
          if(state != 2 && state){
            state -= 1;
            this.setAttribute(state,element);
            return -(((videoNum * (state)) * 210) - (videoNum * 210));
          }
        }
        state =1;
        this.setAttribute(state,element);
        return 0;
      }
    } 
    if(direction==="right"){
      let multiplier = totalVideos - videoNum;
      if(multiplier >0){
        this.setAttribute(2,element);  
      }
      return multiplier * 210;  
    }
    if(direction ==="left"){
      this.setAttribute(1,element);
      return 0;
    }
  }
  
  setAttribute(state:number,element:HTMLElement){
    //set videoCon2's data-state. state indicates the page number it is currently in.
    this.renderer.setAttribute(element,'data-state',state.toString());
  }

  setWidth(){
    let windowWidth = window.innerWidth - 20;
    let sb = 0;
    if(this.isSidebarOpen){
      sb = 200;
    }
    let element = this.element.nativeElement;

    [1260,1050,840,630,420,210].forEach((val, ind, arr)=>{
      const videoLength = this.videos.length;
      const videoNum = this.getVideoNum(this.width);
      if(windowWidth < val + sb && (windowWidth > arr[ind+1] + sb)){
        this.width = arr[ind+1];
        let w = arr[ind+1];
        if(element && (videoLength < videoNum)){
          //if the number of videos sent from the backend is less than 5(1050px), set width as equal to the length of the data sent.
          //or else width would be set for 5 videos regardless of the number of videos actually sent from backend.
          this.renderer.setStyle(element, 'width', arr[(arr.length-videoLength)] + 10 +'px');
          if(videoLength <= 2){
            this.renderer.addClass(this.arrows.nativeElement, 'arrowsRight');
          }
        }
        else if(element){
          this.renderer.setStyle(element, 'width', this.width + 10 +'px');
        }
        //===Adjustments for when screen size gets lower.
        if(w <= 630){
          this.renderer.addClass(this.arrows.nativeElement, 'arrowsRight');
        }else if(!(videoLength < videoNum)){
          //when videos sent from backend is NOT less than the amount of videos that would fit within the screen.
          this.renderer.removeClass(this.arrows.nativeElement,'arrowsRight');
        }
        //^===Adjustsments for when screen size gets lower.
      }
      else if(windowWidth >= val + sb && ind === 0){
        //if the windowWidth is greater than or equal to 1260 including whether sidebar is opened or not.
        this.width = val;
        if(element && (videoLength < videoNum)){
          //if the number of videos sent from the backend is equal to the length of this array, set width as equal to the length of the data sent.
          this.renderer.setStyle(element, 'width', arr[(arr.length-videoLength)] + 10 +'px');
        }
        if(element){
          this.renderer.setStyle(element, 'width', arr[ind] + 10+'px');
        }
      }else if(!(arr[ind+1] + sb) && windowWidth < val + sb){
        //if val is 210, arr[ind+1] gives NaN.
        this.width = 210;
        if(element && (videoLength < videoNum)){
          //if the number of videos sent from the backend is equal to the length of this array, set width as equal to the length of the data sent.
          this.renderer.setStyle(element, 'width', arr[(arr.length-videoLength)] + 10 +'px');
        }
        else if(element){
          this.renderer.setStyle(element, 'width', this.width + 10 +'px');
        }
        this.renderer.addClass(this.arrows.nativeElement, 'arrowsRight');
        this.renderer.addClass(this.arrows.nativeElement, 'small-window-arrows');
        this.renderer.addClass(this.titleh2.nativeElement, 'small-window-h2');
      }
    })
  }

  constructor(private element:ElementRef,private renderer:Renderer2) { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.setWidth();
  }
}