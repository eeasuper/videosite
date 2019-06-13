import { Component, OnInit,Input,Output,EventEmitter,ChangeDetectionStrategy } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators,FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormOutput} from '../dialog-upload.component';
@Component({
  selector: 'app-dumb-dialog-upload',
  templateUrl: './dumb-dialog-upload.component.html',
  styleUrls: ['./dumb-dialog-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DumbDialogUploadComponent implements OnInit {
  public uploadedFileName:string;
  private validFiles:string[]= [".mp4",".webm",".ogg"];
  private validUpload:boolean = false;
  private fileToUpload:FormData;
  @Output('snackbarMessage') snackbarMessage = new EventEmitter<string>();
  @Output('submitChild') submit = new EventEmitter<FormOutput>();
  @Input('loading') public loading:boolean;

  public formGroup = new FormGroup({
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
      this.snackbarMessage.emit("Uploaded file type is not supported!")
    }
  }

  onSubmit(){
    let formOutput:FormOutput = {
      file:this.fileToUpload,
      titleOfFile: this.formGroup.get('titleControl').value, 
      descriptionOfFile: this.formGroup.get('descriptionControl').value
    }
    this.submit.emit(formOutput);
  }
  constructor() { }

  ngOnInit() {
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}