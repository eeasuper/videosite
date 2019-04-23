import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
}                                 from '@angular/router';
import { Observable, Subject,of,forkJoin, EMPTY,BehaviorSubject }  from 'rxjs';
import { mergeMap, take,map,withLatestFrom ,catchError}         from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {ApiCallsService} from '../../../services/api-calls.service';
@Injectable({
  providedIn: 'root'
})
export class AllVideosListResolverService implements Resolve<any> {

  constructor(private service:ApiCallsService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    let userId = parseInt(route.paramMap.get('userId'));
    return this.service.getVideoList(userId).pipe(
      map((val)=>{
          val.forEach((v,i)=>{
            v.thumbnail = this.service.getVideoThumbnail(v.id);
          })
          return val;
        })
    )
    console.log(route.url);
    console.log(route.queryParams);
    return null;
  }
}
