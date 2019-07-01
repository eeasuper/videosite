import { Component, OnInit,ChangeDetectionStrategy,Input,Output,EventEmitter,ElementRef,ViewChild } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective,NgForm,AsyncValidatorFn,ValidationErrors} from '@angular/forms';
import { FormBuilder,Validators, FormArray } from '@angular/forms';
import {ApiCallsService} from '../../../services/api-calls.service';
import {Observable,timer} from 'rxjs';
import {switchMap,first,take,finalize} from 'rxjs/operators'
import {FormOutput} from '../dialog-create-playlist.component';

@Component({
  selector: 'app-dumb-dialog-create-playlist',
  templateUrl: './dumb-dialog-create-playlist.component.html',
  styleUrls: ['./dumb-dialog-create-playlist.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DumbDialogCreatePlaylistComponent implements OnInit {
  @Input('loading') loading;
  @ViewChild('formArray') private formArray:ElementRef;
  @Output("submitChild") submit = new EventEmitter<FormOutput>();
  private invalidUrl= true;
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
  addLink(){
    let control:FormControl = this.fb.control('',[Validators.required],[this.asyncValidator(this.service)]);
    this.urls.push(control);
  }
  asyncValidator(service:ApiCallsService):AsyncValidatorFn{
    //https://www.concretepage.com/angular-2/angular-custom-async-validator-example#Debounce
    return (control:FormControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null> =>{
      let timer$ = timer(2000);
       return timer$.pipe(
        take(1),
        switchMap(()=> {
          let videoId = service.checkUrl(control.value);
          return service.getVideoDescription(videoId).toPromise().then((val:any)=>{

            return (!val.id) ? {"invalidUrl": true} : null;
          })
        }),
        finalize(()=>{
          /* each FormControl is blurred because Angular won't update the presentation after asyncValidation completes Observable */ 
          /* this is a 'hack' to make it update. Nonetheless it still doesn't work perfectly.*/
          Array.from(this.formArray.nativeElement.children).forEach((val:HTMLElement,ind)=>{
            (Array.from(val.children)[0] as HTMLElement).focus();
            (Array.from(val.children)[0] as HTMLElement).blur();
          })  
          
        })
      )
    }
  }

  onSubmit(){
    const urlResult:string[] = this.formGroup.get('urls').value;
    let formOutput:FormOutput = {
      urls: urlResult,
      playlistTitle: this.titleControl.value
    }
    this.submit.emit(formOutput);
  }

  constructor(private fb: FormBuilder,private service:ApiCallsService) { }

  ngOnInit() {
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
