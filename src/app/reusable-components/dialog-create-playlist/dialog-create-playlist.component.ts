import { Component, OnInit,Inject,ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef,MatDialog} from '@angular/material';
import {ApiCallsService} from '../../services/api-calls.service';
import { Store } from '@ngrx/store';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import { FormArray } from '@angular/forms';
import {of,Subscription} from 'rxjs';
import {finalize,timeout,catchError,take} from 'rxjs/operators';

@Component({
  selector: 'app-dialog-create-playlist',
  templateUrl: './dialog-create-playlist.component.html',
  styleUrls: ['./dialog-create-playlist.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogCreatePlaylistComponent implements OnInit {
  public loading:boolean = false;
  test:Subscription
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialog:MatDialog, private router:Router,private snackBar: MatSnackBar, private store:Store<any>,private service:ApiCallsService) { }

  onSubmit(formOutput:FormOutput){
    const playlistData = {  
      title: formOutput.playlistTitle,
      userId: this.data.userId,
      date: new Date().getTime()
    }
    this.loading = true;
    this.test = this.service.createPlaylist(playlistData,formOutput.urls).pipe(
      take(1),
      finalize(()=>{
        this.loading = false;
        this.openSnackBar("Playlist has been created");
        setTimeout(()=>{
          this.dialog.closeAll();
          this.router.navigate(['playlist',this.data.userId])
        },3000)        
      }),
      timeout(4000),
      catchError((error)=>{
        this.loading = false;
        this.openSnackBar("Something went wrong.");
        return of(`I caught: ${error}`)
      })
    ).subscribe(()=>{});

  }
  openSnackBar(message: string) {
    this.snackBar.open(message, "Okay", {
      duration: 5000,
    });
  }

  ngOnInit() {
  }

}
export interface DialogData{
  userId:number;
}
export interface FormOutput{
  urls: string[];
  playlistTitle: string;
}