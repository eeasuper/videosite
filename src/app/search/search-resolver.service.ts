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
import {ApiCallsService} from '../services/api-calls.service';
@Injectable({
  providedIn: 'root'
})
export class SearchResolverService implements Resolve<any>{

  constructor(private service:ApiCallsService) {
  }

 resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
   let query = route.paramMap.get('query');
   return this.service.getSearch(query).pipe(
     map((val)=>{
        val.forEach((v)=>{
          v.thumbnail = this.service.getVideoThumbnail(v.id);
        })
        return val;
     })
    )
   return null;
 }
}
