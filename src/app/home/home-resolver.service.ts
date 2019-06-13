import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY,forkJoin }  from 'rxjs';
import { mergeMap, take,map,retry,catchError}         from 'rxjs/operators';
import {ApiCallsService} from '../services/api-calls.service';
import {Videos} from '../Video';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class HomeResolverService implements Resolve<Videos[]>{

  constructor(private router: Router, private service:ApiCallsService) { }
  
  convertTimetoDate(time:number):string{
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    return new Date(time).toLocaleDateString("en-US", options);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Videos[]> | Observable<never> {
    
    return forkJoin(
      this.service.getVideoRandomList().pipe(
        retry(3),
        map((val:any)=>{
          if(val){
            val.forEach((v,i)=>{
              v.thumbnail = this.service.getVideoThumbnail(v.id);
            })
            return val;
          }else{
            this.router.navigate(['/']);
            return EMPTY;
          }
        }),
        catchError((val)=>{
          return of(`val`)
        })
      ),
      this.service.getVideoRandomList().pipe(
        retry(3),
        map((val)=>{
          if(val){
            val.forEach((v,i)=>{
              v.thumbnail = this.service.getVideoThumbnail(v.id);
            })
            return val;
          }else{
            this.router.navigate(['/']);
            return EMPTY;
          }
        }),
        catchError((val)=>{
          return of(`val`)
        })
      ),
    )
  }
}
