import { Component, OnInit,Inject} from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef,MatDialog} from '@angular/material';
import {ApiCallsService} from '../../services/api-calls.service';
import { FormBuilder,Validators, FormArray,AsyncValidatorFn,ValidationErrors,FormControl } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Store } from '@ngrx/store';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {timer,Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators'
@Component({
  selector: 'app-dialog-add-video-playlist',
  templateUrl: './dialog-add-video-playlist.component.html',
  styleUrls: ['./dialog-add-video-playlist.component.css']
})
export class DialogAddVideoPlaylistComponent implements OnInit {
  public loading:boolean = false;;
  public formGroup = this.fb.group({
    urls: this.fb.array([
      this.fb.control('',[Validators.required],[this.asyncValidator(this.service)])
    ])
  });
  
  get urls() {
    return this.formGroup.get('urls') as FormArray;
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private router:Router,private snackBar: MatSnackBar, private store:Store<any>,private service:ApiCallsService,private fb: FormBuilder) { }

  addLink(){
    this.urls.push(this.fb.control('',[Validators.required],[this.asyncValidator(this.service)]));
  }

  onSubmit(){
    const result:string[] = this.formGroup.get('urls').value;
    this.loading = true;
    this.service.addVideoToPlaylist(this.data.id, result).toPromise().then((res)=>{
      this.loading = false;
      this.openSnackBar("Videos have been added to the playlist. The page will reload in 5 seconds","Okay");
      setTimeout(()=>{
        location.reload();
      },5000)
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
  }

}
export interface DialogData{
  id:any
}
