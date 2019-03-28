import { Component, OnInit,Input,HostListener,Renderer2,ElementRef,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Playlist,Playlists} from '../playlist';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {
  // @Input('data') private data;
  private data;    
  // private data = [
  //   {
  //     name: 'exampleplaylist',
  //     created: 'December 1st 2018',
  //     list:[
  //       {
  //         h3: 'Yui-Ura-On!!!',
  //         thumbnail: '/assets/seeding-thumbnail.png',
  //         uploader: 'example uploader',
  //         views: 'example views',
  //         order: 1
  //       },
  //       {
  //         h3: 'Yui-Ura-On!!! 2',
  //         thumbnail: '/assets/seeding-thumbnail.png',
  //         uploader: 'example uploader2',
  //         views: 'example views2',
  //         order: 3
  //       },
  //       {
  //         h3: 'Yui-Ura-On!!! 3',
  //         thumbnail: '/assets/seeding-thumbnail.png',
  //         uploader: 'example uploader3',
  //         views: 'example views3',
  //         order: 2
  //       }
  //     ]
  //   },
  //   {
  //     name: 'exampleplaylist2',
  //     created: 'December 2nd 2018',
  //     list:[
  //       {
  //         h3: 'Yui-Ura-On!!!',
  //         thumbnail: '/assets/seeding-thumbnail.png',
  //         uploader: 'example uploader',
  //         views: 'example views',
  //         order: 3
  //       },
  //       {
  //         h3: 'Yui-Ura-On!!! 2',
  //         thumbnail: '/assets/seeding-thumbnail.png',
  //         uploader: 'example uploader2',
  //         views: 'example views2',
  //         order: 2
  //       },
  //       {
  //         h3: 'Yui-Ura-On!!! 3',
  //         thumbnail: '/assets/seeding-thumbnail.png',
  //         uploader: 'example uploader3',
  //         views: 'example views3',
  //         order: 1
  //       }
  //     ]
  //   }
  // ]
  private objectValues = Object.values;
  private width;

  orderList(data:any[]){
    return data.sort((a,b)=>{
      return a.order - b.order;
    })
    // return array.reduce((acc,cur)=>{
    //   acc[cur.order] = cur;
    //   return acc;
    // },{});
  }

  mouseenterList(e){
    let parent = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    this.renderer.setStyle(parent,'overflow','visible');
    this.renderer.setStyle(parent,'z-index','2');
  }

  mouseleaveList(e){
    let parent = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    this.renderer.setStyle(parent,'overflow','hidden');
    this.renderer.setStyle(parent,'z-index','1');
  }

  constructor(private element:ElementRef,private renderer:Renderer2, private router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { playlists: Playlists }) => {
        console.log(data);
        this.data = data.playlists;
    });
    // this.orderList(this.data.playlist1.list);
  }

}
