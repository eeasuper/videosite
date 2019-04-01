import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY,BehaviorSubject }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';
// import {User} from '../store/selectors/index';
import {User} from './User';
import {VideoList,Video} from '../video-list/Video-list';
@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<User>{
  private test:User = new User();
  private testList:VideoList = new VideoList();
  private test1:BehaviorSubject<any> = new BehaviorSubject<any>(this.test);
  constructor(private router: Router) {
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

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Observable<never> {
    return this.test1.asObservable().pipe(
        take(1),
        mergeMap(data=>{
          if(data){
            // console.log(of(data));
            return of(data);
          }else{
            this.router.navigate(['/']);
            return EMPTY;
          }
        })
      );
  }
}
