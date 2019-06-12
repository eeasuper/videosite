import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, forkJoin, EMPTY,BehaviorSubject }  from 'rxjs';
import { mergeMap, take,map }         from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {ApiCallsService} from '../services/api-calls.service';
@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<any>{
 
  constructor(private router: Router,private store:Store<any>, private service:ApiCallsService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    let userId = route.paramMap.get('userId');
 
    return forkJoin(
     this.service.getVideoRecentList(userId).pipe(
        map((val)=>{
          val.forEach((v,i)=>{
            v.thumbnail = this.service.getVideoThumbnail(v.id);
          })
          return val;
        })
      ),
      this.service.getUser(userId)
    )
  }
}
