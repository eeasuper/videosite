import { Component, OnInit, Renderer2, ElementRef,ViewChild,Inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Playlist,Playlists,Video} from '../playlist';
import {DraggableCellService} from './draggable-cell.service'
import {Observable,Subscription} from 'rxjs';
import {ApiCallsService} from '../../services/api-calls.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {DialogCloseComponent} from '../../reusable-components/dialog-close/dialog-close.component';
import {DialogAddVideoPlaylistComponent} from '../../reusable-components/dialog-add-video-playlist/dialog-add-video-playlist.component';
@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.css']
})
export class EditPlaylistComponent implements OnInit{
  private playlist;
  @ViewChild('h2InputCon') private h2InputCon:ElementRef;
  @ViewChild('h2Input') private h2Input:ElementRef;
  @ViewChild('h2Title') private h2Title:ElementRef;
  @ViewChild('saveButton') private saveButton:ElementRef;

  constructor(private router:Router,private route: ActivatedRoute, private renderer:Renderer2, public dialog: MatDialog, private service:ApiCallsService) { }

  openDialog():void{
    this.dialog.open(DialogCloseComponent, {
      data: {
        type: 'playlist',
        id: this.playlist.id
      }
    });
  }

  openAddDialog():void{
    this.dialog.open(DialogAddVideoPlaylistComponent,{
      data:{
        id: this.playlist.id,
      }
    });
  }

  h2Click(e):void{
    this.renderer.setStyle(this.h2Title.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.h2InputCon.nativeElement, 'display', 'block');
    this.h2Input.nativeElement.focus();
  }

  h2InputBlur(e):void{
    //DO API CALL HERE, after success or before -for speed-do:
    this.playlist.title = e.target.value;

    this.renderer.setStyle(this.h2Title.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.h2InputCon.nativeElement, 'display','none');
  }
  // orderList(data:Video[]){
  //   return data.sort((a,b)=>{
  //     return a.order - b.order;
  //   })
  // }

  drop(e: CdkDragDrop<string[]>){
    this.toggleSave(false);
    moveItemInArray(this.playlist.playlist, e.previousIndex, e.currentIndex);
  }

  // makeIndexBeOrder(list){
  //   //use this function when making the api call.
  //   return list.map((val,ind)=>{
  //     val.order = ind;
  //     return val;
  //   })
  // }
  // playAll(){
  //   this.router.navigate(["/view",this.playlist.playlist[0].url])
  // }
  saveChanges():void{
    this.service.setPlaylistOrder(this.playlist);
    console.log(this.playlist);
    this.toggleSave(true);
  }
  toggleSave(saveChanges:boolean):void{
    if(!saveChanges){
      this.renderer.removeAttribute(this.saveButton.nativeElement, 'disabled');
    }else if(saveChanges){
      this.renderer.setAttribute(this.saveButton.nativeElement, 'disabled','true');
    }
  }
  ngOnInit() {
    this.route.data
      .subscribe((data: { playlist: Playlist }) => {
        this.playlist = data.playlist;
    });
  }
}
