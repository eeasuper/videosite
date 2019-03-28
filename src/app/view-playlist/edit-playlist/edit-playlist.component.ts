import { Component, OnInit, Renderer2, ElementRef,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Playlist,Playlists,Video} from '../playlist';
import {DraggableCellService} from './draggable-cell.service'
import {Observable,Subscription} from 'rxjs';

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.css']
})
export class EditPlaylistComponent implements OnInit {
  private data;
  private list;
  @ViewChild('h2InputCon') private h2InputCon:ElementRef;
  @ViewChild('h2Input') private h2Input:ElementRef;
  @ViewChild('h2Title') private h2Title:ElementRef;

  constructor(private router:Router,private route: ActivatedRoute, private renderer:Renderer2, private service:DraggableCellService) { }

  h2Click(e){
    this.renderer.setStyle(this.h2Title.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.h2InputCon.nativeElement, 'display', 'block');
    this.h2Input.nativeElement.focus();
  }

  h2InputBlur(e){
    //DO API CALL HERE, after success or before -for speed-do:
    this.data.name = e.target.value;

    this.renderer.setStyle(this.h2Title.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.h2InputCon.nativeElement, 'display','none');
  }
  orderList(data:Video[]){
    return data.sort((a,b)=>{
      return a.order - b.order;
    })
  }

  drop(e: CdkDragDrop<string[]>){
    moveItemInArray(this.data.list, e.previousIndex, e.currentIndex);
  }

  // makeIndexBeOrder(list){
  //   //use this function when making the api call.
  //   return list.map((val,ind)=>{
  //     val.order = ind;
  //     return val;
  //   })
  // }

  test2(){
    console.log("clicked");
  }
  ngOnInit() {
    this.route.data
      .subscribe((data: { playlist: Playlist }) => {
        this.data = data.playlist;
        this.list = this.orderList(this.data.list);
    });

  }

}
