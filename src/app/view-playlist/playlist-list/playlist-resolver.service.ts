import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY,BehaviorSubject }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';

import {Playlist,Video,Playlists} from '../playlist';
import {ApiCallsService} from '../../services/api-calls.service';
@Injectable({
  providedIn: 'root'
})
//change to resolve<Playlists or somethingelse.>
export class PlaylistResolverService implements Resolve<any> {

  constructor(private router: Router, private service:ApiCallsService) {
    // this.test.updated = 'December 1st 2018';
    // this.test.name = 'exampleplaylist'
    // this.test.id = 1;
    // this.test.edit_url = '/playlist/1/1/edit'
    // this.test.uploader_id = 1;
    // let playlist1:Video = {
    //   h3: 'Yui-Ura-On!!!',
    //   thumbnail: '/assets/seeding-thumbnail.png',
    //   uploader: 'example uploader',
    //   views: 'example views',
    //   order: 1,
    //   url : '/view/1'
    // }
    // let playlist2:Video = {
    //   h3: 'Yui-Ura-On!!! 2',
    //   thumbnail: '/assets/seeding-thumbnail.png',
    //   uploader: 'example uploader2',
    //   views: 'example views2',
    //   order: 3,
    //   url : '/view/1'
    // }
    // let playlist3:Video = {
    //   h3: 'Yui-Ura-On!!! 3',
    //   thumbnail: '/assets/seeding-thumbnail.png',
    //   uploader: 'example uploader3',
    //   views: 'example views3',
    //   order: 2,
    //   url : '/view/1'
    // }
    // let a = new Array<Video>();
    // this.test.list = a;
    // this.test.list.push(playlist1);
    // this.test.list.push(playlist2);
    // this.test.list.push(playlist3);
    // // let b = new Array<Playlist>();
    // // this.test2.playlists = b;
    // this.test2.push(this.test);
    // this.test2.push(this.test);
   }

  // private test:Playlist = new Playlist();
  // private test2: Playlist[] = [];
  // private test1:BehaviorSubject<any> = new BehaviorSubject<any>(this.test2);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    let userId = route.paramMap.get('userId');
    return this.service.getAllPlaylists(userId).pipe(
        take(1),
        mergeMap(data=>{
          if(data){
            console.log(data);
            data.forEach((val,ind)=>{
              val.playlist = Object.values(val.playlist);
              val.thumbnail = this.service.getVideoThumbnail(val.playlist[0].id);
              val.url = "/view/"+val.playlist[0].id;
              val.edit_url = "/playlist/"+val.userId+"/"+val.id+"/edit";
              val.date = this.service.setDate(val.date);
            })
            return of(data);
          }else{
            return EMPTY;
          }
        })
      )
    }
}
