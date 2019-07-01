import { Component, OnInit,Inject,ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef,MatDialog} from '@angular/material';
import {ApiCallsService} from '../../services/api-calls.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-dialog-close',
  templateUrl: './dialog-close.component.html',
  styleUrls: ['./dialog-close.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogCloseComponent {

  delete(type){
    switch(type){
      case 'playlist':
        this.router.navigate(["/"]);
        this.service.deletePlaylist(this.data.id,this.data.userId);
      default :
        return;
    }
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private service:ApiCallsService,private router:Router) { }

}
export interface DialogData{
  type: string;
  id: string;
  userId: number;
}