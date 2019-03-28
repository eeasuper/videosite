import { Injectable } from '@angular/core';
import {Playlist,Video} from '../playlist';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY,BehaviorSubject }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';


//try importing resolver in edit-playlist.module instead of the parent to make things organized.
@Injectable({
  providedIn: 'root'
})
export class EditPlaylistResolverService implements Resolve<Playlist> {

  private test:Playlist = new Playlist();
  private test1:BehaviorSubject<any> = new BehaviorSubject<any>(this.test);
  constructor(private router: Router) {
        this.test.updated = 'December 1st 2018';
    this.test.name = 'exampleplaylist'
    this.test.id = 1;
    let playlist1:Video = {
      h3: 'Yui-Ura-On!!!',
      thumbnail: '/assets/seeding-thumbnail.png',
      uploader: 'example uploader',
      views: 'example views',
      order: 1
    }
    let playlist2:Video = {
      h3: 'Yui-Ura-On!!! 2',
      thumbnail: '/assets/seeding-thumbnail.png',
      uploader: 'example uploader2',
      views: 'example views2',
      order: 3
    }
    let playlist3:Video = {
      h3: 'Yui-Ura-On!!! 3',
      thumbnail: '/assets/seeding-thumbnail.png',
      uploader: 'example uploader3',
      views: 'example views3',
      order: 2
    }
    let a = new Array<Video>();
    this.test.list = a;
    this.test.list.push(playlist1);
    this.test.list.push(playlist2);
    this.test.list.push(playlist3);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Playlist> | Observable<never> {
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
