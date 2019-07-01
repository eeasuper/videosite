import { Component, OnInit,ViewChild,ElementRef,EventEmitter,Output,ChangeDetectionStrategy,Input } from '@angular/core';
import { FormBuilder,Validators, FormArray,AsyncValidatorFn,ValidationErrors,FormControl } from '@angular/forms';
import {ApiCallsService} from '../../../services/api-calls.service';
import {timer,Observable} from 'rxjs';
import {switchMap,take,finalize} from 'rxjs/operators'
import {FormOutput} from '../dialog-add-video-playlist.component';
@Component({
  selector: 'app-dumb-dialog-add-video-playlist',
  templateUrl: './dumb-dialog-add-video-playlist.component.html',
  styleUrls: ['./dumb-dialog-add-video-playlist.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DumbDialogAddVideoPlaylistComponent implements OnInit {
  @ViewChild('formArray') private formArray:ElementRef;
  @Output("submitChild") submit = new EventEmitter<FormOutput>();
  @Input('loading') loading;
  public formGroup = this.fb.group({
    urls: this.fb.array([
      this.fb.control('',[Validators.required],[this.asyncValidator(this.service)])
    ])
  });
  
  get urls() {
    return this.formGroup.get('urls') as FormArray;
  }

  addLink(){
    this.urls.push(this.fb.control('',[Validators.required],[this.asyncValidator(this.service)]));
  }

  onSubmit(){
    const urlResult:string[] = this.formGroup.get('urls').value;
    let formOutput:FormOutput = {
      urls: urlResult,
    }
    this.submit.emit(formOutput);
  }

  constructor(private service:ApiCallsService,private fb:FormBuilder) { }

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
  ngOnInit() {
  }

}
