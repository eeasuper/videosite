import { Component, OnInit,Input,HostListener,Renderer2,ElementRef,ViewChild,OnDestroy,ChangeDetectorRef,ChangeDetectionStrategy} from '@angular/core';
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
        this.debounce = 0;
      },200);
    }
  }

  private isSidebarOpen = true;

  constructor(private renderer:Renderer2, private element:ElementRef,private sidebar:SidebarService,private cdRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.sidebarSubscription = this.sidebar.change.asObservable().subscribe(isOpen=>{
      this.isSidebarOpen = isOpen;
      this.widthChanged = !this.widthChanged;
      this.cdRef.markForCheck();
    })
  }

  ngOnDestroy(){
    this.sidebarSubscription.unsubscribe();
  }
}

