import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef,MatDialog} from '@angular/material';
@Component({
  selector: 'app-dialog-close',
  templateUrl: './dialog-close.component.html',
  styleUrls: ['./dialog-close.component.css']
})
export class DialogCloseComponent {
  //do an Apicall here... for deleting things.
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

}
export interface DialogData{
  type: string;
}