import { Injectable } from '@angular/core';
import {Video} from '../Video';
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
export class ViewVideoResolverService implements Resolve<any>{

  constructor(private router: Router, private route:ActivatedRoute,private http:HttpClient, private service:ApiCallsService) {
  }

  getIP():Observable<any>{
    return this.http.get("https://api.ipify.org?format=json").pipe(
    )
  }
  private viewPlaylist;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    let videoId = route.paramMap.get('videoid');
    this.viewPlaylist = route.queryParams['playlist'];

    if(this.viewPlaylist){
      return forkJoin(
        this.service.getIP().pipe(
          map(result=>{
            return this.service.setViewCount(parseInt(videoId),result.ip).subscribe();
          })
        ),
        this.service.getViewCount(parseInt(videoId)),
        this.service.getVideoDescription(videoId),
        this.service.getPlaylist(this.viewPlaylist).pipe(
          map(result=>{
            result.playlist = Object.values(result.playlist);
            result.playlist.forEach((val:any,ind)=>{
              val.ordered = ind + 1;
              val.thumbnail = this.service.getVideoThumbnail(val.id);
              val.url = "/view/"+val.id;
            })
            return result;
          })
          )
      )
    }
    return forkJoin(
        this.service.getIP().pipe(
          map(result=>{
            return this.service.setViewCount(parseInt(videoId),result.ip).subscribe();
          })
        ),
        this.service.getViewCount(parseInt(videoId)),
        this.service.getVideoDescription(videoId)
      )
  }
  
  pipe(ob:Observable<any>):Observable<any>{
    return ob.pipe(
      take(1),
      mergeMap(data=>{
        if(data){
          return of(data);
        }else{
          this.router.navigate(['/']);
          return EMPTY;
        }
      })
    );
  }
}