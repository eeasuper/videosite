import { Component, OnInit,Input,HostListener,Renderer2 } from '@angular/core';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  @Input('data') private data:any;
  private objectValues = Object.values;
  // private videos:object;
  // private videos2:any = [];
  // private debounce:number = 0;

  // @HostListener('window:resize', ['$event'])
  // limitVideos(){
  //   let windowWidth = window.innerWidth;
  //   if(this.debounce === 0){
  //     this.debounce = window.setTimeout(()=>{
  //       if(windowWidth <=850){
  //         if(this.objectValues(this.data.list).length > 4) {
  //           this.videos2 = this.objectValues(this.data.list).reduce((acc:any[],cur,i)=>{
  //             console.log(cur);  
  //             if(i > 3){
  //               acc.push(cur);
  //             }
  //             return acc;
  //           },[]);
  //           this.videos = this.objectValues(this.data.list).reduce((acc:any[],cur,i)=>{
  //             if(i<=3){
  //               acc.push(cur);
  //             }
  //             return acc;
  //           },[])
  //           console.log(this.videos2);
  //           console.log(this.videos);
  //         }      
  //       }
  //       if(windowWidth){

  //       }

  //       this.debounce = 0;
  //     },300);
  //   }
  // }

  constructor(private renderer:Renderer2) { }

  ngOnInit() {
    // this.videos = this.data;
    // this.limitVideos()
  }

}
