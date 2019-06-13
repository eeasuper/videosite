import { Component, OnInit,Inject,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef,MatDialog} from '@angular/material';
import {ApiCallsService} from '../../services/api-calls.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-dialog-upload',
  templateUrl: './dialog-upload.component.html',
  styleUrls: ['./dialog-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogUploadComponent implements OnInit {

  public loading: boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialog:MatDialog,private snackBar: MatSnackBar,private service:ApiCallsService,private cdRef:ChangeDetectorRef) { }
  openSnackBar(message: string) {
    this.snackBar.open(message, "Okay", {
      duration: 5000,
    });
  }

  onSubmit(formOutput:FormOutput){
    this.loading = true;
    return this.service.uploadVideo(formOutput.file,this.data.userId).toPromise().then((res)=>{
      return this.service.setVideoContent(parseInt(res.id), formOutput.titleOfFile, formOutput.descriptionOfFile)
        .toPromise().then((res)=>{
          this.loading = false;
          this.cdRef.markForCheck();
          this.dialog.closeAll();
          this.openSnackBar("Video is successfully uploaded");
        }).catch((err)=>{
          this.loading = false;
          this.openSnackBar("Something went wrong with the server");
        })
    })
  }

  
  ngOnInit() {
  }

}

export interface DialogData{
  userId:number;
}

export interface FormOutput {
  file: FormData;
  titleOfFile: string;
  descriptionOfFile: string;
}
