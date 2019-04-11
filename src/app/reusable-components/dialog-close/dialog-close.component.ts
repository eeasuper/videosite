import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef,MatDialog} from '@angular/material';
import {ApiCallsService} from '../../services/api-calls.service';
@Component({
  selector: 'app-dialog-close',
  templateUrl: './dialog-close.component.html',
  styleUrls: ['./dialog-close.component.css']
})
export class DialogCloseComponent {

  delete(type){
    switch(type){
      case 'playlist':
        this.service.deletePlaylist(this.data.id);
      default :
        return;
    }
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private service:ApiCallsService) { }

}
export interface DialogData{
  type: string;
  id: string;
}