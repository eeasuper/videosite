import { Component, OnInit,Renderer2,ViewChild,ElementRef,Output,Input,EventEmitter,ChangeDetectionStrategy } from '@angular/core';
import {Observable,Subscription,timer} from 'rxjs';
import {switchMap,take} from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {PlaylistTitle} from '../edit-playlist.component';

@Component({
  selector: 'app-dumb-edit-playlist',
  templateUrl: './dumb-edit-playlist.component.html',
  styleUrls: ['./dumb-edit-playlist.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DumbEditPlaylistComponent implements OnInit {
  @Input('mainThumbnail') mainThumbnail;
  @Input('playlist') playlist;
  @Output('saveChanges') saveC = new EventEmitter<null>();
  @Output('setPT') setPT = new EventEmitter<PlaylistTitle>();
  @Output('openDD') openDD = new EventEmitter<null>();
  @Output('openAD') openAD = new EventEmitter<null>();
  @ViewChild('h2InputCon') private h2InputCon:ElementRef;
  @ViewChild('h2Input') private h2Input:ElementRef;
  @ViewChild('h2Title') private h2Title:ElementRef;
  @ViewChild('saveButton') private saveButton:ElementRef;

  h2Click(e):void{
    this.renderer.setStyle(this.h2Title.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.h2InputCon.nativeElement, 'display', 'block');
    this.h2Input.nativeElement.focus();
  }

  h2InputBlur(e):void{
    let newTitle:PlaylistTitle = {
      playlistId: this.playlist.id,
      newTitle: e.target.value
    }
    this.setPT.emit(newTitle);
    this.playlist.title = e.target.value;
    this.renderer.setStyle(this.h2Title.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.h2InputCon.nativeElement, 'display','none');
  }

  drop(e: CdkDragDrop<string[]>){
    this.toggleSave(false);
    moveItemInArray(this.playlist.playlist, e.previousIndex, e.currentIndex);
    let timer$ = timer(4000);
    timer$.pipe(
      take(1),
      switchMap(()=>{
        this.mainThumbnail = this.playlist.playlist[0].thumbnail;
        return new Observable;
      })
    ).subscribe(()=>{});
  }

  toggleSave(saveChanges:boolean):void{
    if(!saveChanges){
      this.renderer.removeAttribute(this.saveButton.nativeElement, 'disabled');
    }else if(saveChanges){
      this.renderer.setAttribute(this.saveButton.nativeElement, 'disabled','true');
    }
  }
  saveChanges(){
    this.toggleSave(true);
    this.saveC.emit(this.playlist);
  }
  openDeleteDialog(){
    this.openDD.emit();
  }
  openAddDialog(){
    this.openAD.emit();
  }
  constructor(private renderer:Renderer2) { }

  ngOnInit() {
  }

}
