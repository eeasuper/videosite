import { Component, OnInit,Inject} from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef,MatDialog} from '@angular/material';
import {ApiCallsService} from '../../services/api-calls.service';
import {FormControl, FormGroupDirective, NgForm, Validators,FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Store } from '@ngrx/store';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-dialog-upload',
  templateUrl: './dialog-upload.component.html',
  styleUrls: ['./dialog-upload.component.css']
})
export class DialogUploadComponent implements OnInit {
  private uploadedFileName:string;
  private validFiles:string[]= [".mp4",".webm",".ogg"];
  private loading;
  private validUpload:boolean = false;
  private fileToUpload:FormData;

  private formGroup = new FormGroup({
    fileControl: new FormControl('', [
      Validators.required
      ]),
    titleControl: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(75)
      ]),
    descriptionControl: new FormControl('', [
      Validators.maxLength(2500)
      ]),
  });
  matcher = new MyErrorStateMatcher();

  onFileChange(event){
    let fileToUpload:File = event.target.files[0];
    this.uploadedFileName = fileToUpload.name;
    let validity:boolean = this.validFiles.some((val,ind)=>{
      let type:string = this.uploadedFileName.substring(
        this.uploadedFileName.lastIndexOf("."),this.uploadedFileName.length
      )
      if (type === val){
        return true;
      }
    })
    if(event.target.files && event.target.files.length && validity) {
      this.validUpload =true;
      let fd = new FormData();
      fd.append('file', fileToUpload, fileToUpload.name);
      this.fileToUpload = fd;
    }else{
      this.validUpload = false;
      this.openSnackBar("Uploaded file type is not supported!","Okay");
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  onSubmit(){
    this.loading = true;
    return this.service.uploadVideo(this.fileToUpload,this.data.user.id).toPromise().then((res)=>{
      return this.service.setVideoContent(res.id, this.formGroup.get('titleControl').value, this.formGroup.get('descriptionControl').value)
        .toPromise().then((res)=>{
          this.loading = false;
          this.openSnackBar("Video is successfully uploaded", "Okay!");
        }).catch((err)=>{
          this.loading = false;
          this.openSnackBar("Something went wrong with the server", "Okay");
        })
    })
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private snackBar: MatSnackBar, private store:Store<any>,private service:ApiCallsService) { }
  ngOnInit() {
  }

}

export interface DialogData{
  user:any;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
