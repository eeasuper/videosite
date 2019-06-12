import { Component, OnInit,Input,HostListener,Renderer2,ElementRef,ViewChild,OnDestroy,ChangeDetectionStrategy} from '@angular/core';
import {SidebarService} from '../services/sidebar.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-video-list',
  template: `<app-dumb-video-list [videos]="data" [update]="widthChanged" [title]="title" 
    [hidden]="data.length === 0" [isSidebarOpen]="isSidebarOpen"></app-dumb-video-list>`,
  styles: [':host{ display: flex; overflow:hidden; justify-content: center;width:100%;}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoListComponent implements OnInit,OnDestroy {

  @Input('data') public data:any;
  @Input('title') public title:string;
  public widthChanged:boolean = true;
  private debounce:number = 0;
  private sidebarSubscription:Subscription;

  @HostListener('window:resize', ['$event'])
  limitVideos(){
    this.limit();
  }

  limit(){
    if(this.debounce === 0){
      this.debounce = window.setTimeout(()=>{
        this.widthChanged = !this.widthChanged;
        // this.setWidth(this.dumbVideos.nativeElement);
        this.debounce = 0;
      },200);
    }
  }

  private isSidebarOpen = true;

  constructor(private renderer:Renderer2, private element:ElementRef,private sidebar:SidebarService) { }

  ngOnInit() {
    this.sidebarSubscription = this.sidebar.change.asObservable().subscribe(isOpen=>{
      this.isSidebarOpen = isOpen;
      this.widthChanged = !this.widthChanged;
      // this.setWidth(this.videoCon.nativeElement);
    })
  }

  ngOnDestroy(){
    this.sidebarSubscription.unsubscribe();
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