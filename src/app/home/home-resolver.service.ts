import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY,BehaviorSubject }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';
import {ApiCallsService} from '../services/api-calls.service';
import {ListData} from './home.component';
@Injectable({
  providedIn: 'root'
})
export class HomeResolverService implements Resolve<any>{

  constructor(private router: Router, private api:ApiCallsService) { }
    private date:number = 1554691136882;
  private test2:ListData = {
    h2: 'Recommended',
    list:[
      {
        h3: 'Yui-Ura-On!!!',
        thumbnail: '/assets/seeding-thumbnail.png',
        uploader: 'example uploader',
        views: 'example views',
        date: this.convertTimetoDate(this.date)
      },
      {
        h3: 'Yui-Ura-On!!! 2',
        thumbnail: '/assets/seeding-thumbnail.png',
        uploader: 'example uploader2',
        views: 'example views2',
        date: this.convertTimetoDate(this.date)
      },
      {
        h3: 'Yui-Ura-On!!! 3',
        thumbnail: '/assets/seeding-thumbnail.png',
        uploader: 'example uploader3',
        views: 'example views3',
        date: this.convertTimetoDate(this.date)
      },
      {
        h3: 'Yui-Ura-On!!! 3',
        thumbnail: '/assets/seeding-thumbnail.png',
        uploader: 'example uploader3',
        views: 'example views3',
        date: this.convertTimetoDate(this.date)
      },
      {
        h3: 'Yui-Ura-On!!! 3',
        thumbnail: '/assets/seeding-thumbnail.png',
        uploader: 'example uploader3',
        views: 'example views3',
        date: this.convertTimetoDate(this.date)
      },
      {
        h3: 'Yui-Ura-On!!! 6',
        thumbnail: '/assets/seeding-thumbnail.png',
        uploader: 'example uploader3',
        views: 'example views3',
        date: this.convertTimetoDate(this.date)
      }
    ]
  }

  private test1:BehaviorSubject<any> = new BehaviorSubject<any>(this.test2);
  convertTimetoDate(time:number):string{
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    return new Date(time).toLocaleDateString("en-US", options);
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    let response:Observable<any> = this.api.getVideoRandomList();

    // return response.pipe(
    //   take(1),
    //   mergeMap(videoLists=>{
    //     if(videoLists){
    //       return of(videoLists);
    //     }else{
    //       this.router.navigate(['/']);
    //       return EMPTY;
    //     }
    //   })
    // );
    return this.test1.asObservable().pipe(
      take(1),
      mergeMap(videoLists=>{
        if(videoLists){
          return of(videoLists.list);
        }else{
          this.router.navigate(['/']);
          return EMPTY;
        }
      })
    );
  }
}
