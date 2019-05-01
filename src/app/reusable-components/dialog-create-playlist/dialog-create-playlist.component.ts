import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef,MatDialog} from '@angular/material';
import {ApiCallsService} from '../../services/api-calls.service';
import { FormBuilder,Validators, FormArray } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective,NgForm,AsyncValidatorFn,ValidationErrors} from '@angular/forms';
import { Store } from '@ngrx/store';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {timer,Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators'

@Component({
  selector: 'app-dialog-create-playlist',
  templateUrl: './dialog-create-playlist.component.html',
  styleUrls: ['./dialog-create-playlist.component.css']
})
export class DialogCreatePlaylistComponent implements OnInit {
  private invalidUrl= true;
  public loading:boolean = false;
  public formGroup = this.fb.group({
    title: ['',[Validators.required,Validators.maxLength(75),Validators.minLength(5)]],
    urls: this.fb.array([
      this.fb.control('',[Validators.required],[this.asyncValidator(this.service)])
    ])
  });
  matcher = new MyErrorStateMatcher();
  get urls() {
    return this.formGroup.get('urls') as FormArray;
  }

  get titleControl(){
    return this.formGroup.get('title');
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialog:MatDialog, private router:Router,private snackBar: MatSnackBar, private store:Store<any>,private service:ApiCallsService,private fb: FormBuilder) { }

  addLink(){
    let control = this.fb.control('',[Validators.required],[this.asyncValidator(this.service)]);
    this.urls.push(control);
  }

  onSubmit(){
    const urlResult:string[] = this.formGroup.get('urls').value;
    const playlistData = {
      title: this.titleControl.value,
      userId: this.data.userId,
      date: new Date().getTime()
    }
    this.loading = true;
    this.service.createPlaylist(playlistData).toPromise().then((res)=>{
      console.log(res);
      this.service.addVideoToPlaylist(res.id,urlResult).toPromise().then((r)=>{
        this.loading = false;
        this.openSnackBar("Playlist has been created","Okay");
        setTimeout(()=>{
          // location.reload();
          this.dialog.closeAll();
          this.router.navigate(['playlist',this.data.userId])
        },3000)
      }).catch((err)=>{
        this.loading = false;
        this.openSnackBar("Something went wrong.","Okay");
      })
    }).catch((err)=>{
      this.loading = false;
      this.openSnackBar("Something went wrong.","Okay");
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  asyncValidator(service:ApiCallsService):AsyncValidatorFn{
    //https://www.concretepage.com/angular-2/angular-custom-async-validator-example#Debounce
    return (control:FormControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null> =>{
    let timer$ = timer(2000);
     return timer$.pipe(
      switchMap(()=> {
        let videoId = service.checkUrl(control.value);
        return service.getVideoDescription(videoId).toPromise().then((val:any)=>{
        return (!val.id) ? {"invalidUrl": true} : null;
        })
      })
    )
  }
  }

  ngOnInit() {

    // this.urls.controls[0].setAsyncValidators.setErrors({invalid:true})
    // this.urls.controls[0].setAsyncValidators()
    console.log(this.urls.controls[0]);
  }

}
export interface DialogData{
  userId:number;
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
