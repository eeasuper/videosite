import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY,BehaviorSubject }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';

import {Playlist,Video,Playlists} from '../playlist';

@Injectable({
  providedIn: 'root'
})
//change to resolve<Playlists or somethingelse.>
export class PlaylistResolverService implements Resolve<any> {

  constructor(private router: Router) {
    this.test.updated = 'December 1st 2018';
    this.test.name = 'exampleplaylist'
    this.test.id = 1;
    this.test.edit_url = '/playlist/1/1/edit'
    this.test.uploader_id = 1;
    let playlist1:Video = {
      h3: 'Yui-Ura-On!!!',
      thumbnail: '/assets/seeding-thumbnail.png',
      uploader: 'example uploader',
      views: 'example views',
      order: 1,
      url : '/view/1'
    }
    let playlist2:Video = {
      h3: 'Yui-Ura-On!!! 2',
      thumbnail: '/assets/seeding-thumbnail.png',
      uploader: 'example uploader2',
      views: 'example views2',
      order: 3,
      url : '/view/1'
    }
    let playlist3:Video = {
      h3: 'Yui-Ura-On!!! 3',
      thumbnail: '/assets/seeding-thumbnail.png',
      uploader: 'example uploader3',
      views: 'example views3',
      order: 2,
      url : '/view/1'
    }
    let a = new Array<Video>();
    this.test.list = a;
    this.test.list.push(playlist1);
    this.test.list.push(playlist2);
    this.test.list.push(playlist3);
    // let b = new Array<Playlist>();
    // this.test2.playlists = b;
    this.test2.push(this.test);
    this.test2.push(this.test);
   }

  private test:Playlist = new Playlist();
  private test2: Playlist[] = [];
  private test1:BehaviorSubject<any> = new BehaviorSubject<any>(this.test2);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    //returns Observable<Playlists>
    // let id = route.paramMap.get('userId');

  //  return this.cs.getCrisis(id).pipe(
  //     take(1),
  //     mergeMap(crisis => {
  //       if (crisis) {
  //         return of(crisis);
  //       } else { // id not found
  //         this.router.navigate(['/crisis-center']);
  //         return EMPTY;
  //       }
  //     })
  //   );
  // }
  return this.test1.asObservable().pipe(
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
    // console.log(a);
    // return a;
  }
}
