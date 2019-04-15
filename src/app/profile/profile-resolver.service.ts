import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, forkJoin, EMPTY,BehaviorSubject }  from 'rxjs';
import { mergeMap, take,map }         from 'rxjs/operators';
// import {User} from '../store/selectors/index';
import {User} from './User';
import {VideoList,Video} from '../video-list/Video-list';
import { Store } from '@ngrx/store';
import {ApiCallsService} from '../services/api-calls.service';
@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<any>{
  private test:User = new User();
  private testList:VideoList = new VideoList();
  private test1:BehaviorSubject<any> = new BehaviorSubject<any>(this.test);
  constructor(private router: Router,private store:Store<any>, private service:ApiCallsService) {
    this.test.id = 1;
    this.test.username = "test_username";
    this.testList.list = new Array();
    let a = new Video();
    a = {h3:'Yui-Ura_On',thumbnail:'/assets/seeding-thumbnail.png',uploader:'test',views:1,url:'/view/1'};
    this.testList.list.push(a);
    this.testList.list.push(a);
    this.testList.list.push(a);
    this.testList.list.push(a);
    this.testList.list.push(a);
    this.testList.h2 = 'Recent Uploads';
    this.test.recent_uploads = this.testList;
  }
  private authenticated:boolean;
  getAuthorization(userId:number, loggedInId:number){
    if(userId === loggedInId){
      return true;
    }else{
      false;
    }
  }
  private user;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    let userId = route.paramMap.get('userId');
    this.store.select('user').subscribe(user=>{
      let loggedInId = user.user.id;   
      if(!user.isAuthenticated){
        this.authenticated = false;
      }else if(user.isAuthenticated && this.getAuthorization(parseInt(userId),loggedInId)){
        this.authenticated = true;
        this.user = user.user;
      }else{
        this.authenticated = false
      }
    })
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

    // return this.service.getVideoRecentList(userId).pipe(
    //     take(1),
    //     mergeMap(data=>{
    //       if(data){
    //         // console.log(of(data));
    //         // let a = {};
    //         // a["user"] = this.user;
    //         // a["recentVideoList"] = data;
    //         // console.log(a);
    //         // return of(a);
    //         return data;
    //       }else{
    //         this.router.navigate(['/']);
    //         return EMPTY;
    //       }
    //     })
    //   );
  }
}
