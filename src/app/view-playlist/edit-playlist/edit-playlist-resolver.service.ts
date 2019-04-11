import { Injectable } from '@angular/core';
import {Playlist,Video} from '../playlist';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY,BehaviorSubject }  from 'rxjs';
import { mergeMap, take,map}         from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {ApiCallsService} from '../../services/api-calls.service';
//try importing resolver in edit-playlist.module instead of the parent to make things organized.
@Injectable({
  providedIn: 'root'
})
export class EditPlaylistResolverService implements Resolve<Playlist> {

  private test:Playlist = new Playlist();
  private test1:BehaviorSubject<any> = new BehaviorSubject<any>(this.test);
  constructor(private router: Router, private store:Store<any>, private service:ApiCallsService) {
    this.test.updated = 'December 1st 2018';
    this.test.name = 'exampleplaylist'
    this.test.id = 1;
    this.test.uploader_id = 1;
    let playlist1:Video = {
      h3: 'Yui-Ura-On!!!',
      thumbnail: '/assets/seeding-thumbnail.png',
      uploader: 'example uploader',
      views: 'example views',
      order: 1,
      url: '/view/1'
    }
    let playlist2:Video = {
      h3: 'Yui-Ura-On!!! 2',
      thumbnail: '/assets/seeding-thumbnail.png',
      uploader: 'example uploader2',
      views: 'example views2',
      order: 3,
      url: '/view/1'
    }
    let playlist3:Video = {
      h3: 'Yui-Ura-On!!! 3',
      thumbnail: '/assets/seeding-thumbnail.png',
      uploader: 'example uploader3',
      views: 'example views3',
      order: 2,
      url: '/view/1'
    }
    let a = new Array<Video>();
    this.test.list = a;
    this.test.list.push(playlist1);
    this.test.list.push(playlist2);
    this.test.list.push(playlist3);
  }
  getEditAuthorization(playlistUploaderId:number, loggedInId:number){
    if(playlistUploaderId === loggedInId){
      return true;
    }else{
      false;
    }
  }
  private authenticated:boolean;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Playlist> | Observable<never> {
    let userId = route.paramMap.get('userId');
    let playlistId = route.paramMap.get('playlistId');
    this.store.select('user').subscribe(user=>{
      let loggedInId = user.user.id;   
      if(!user.isAuthenticated){
        this.authenticated = false;
      }else if(user.isAuthenticated && this.getEditAuthorization(parseInt(userId),loggedInId)){
        this.authenticated = true;
      }else{
        this.authenticated = false
      }
    })
    if(!this.authenticated){
      this.router.navigate(['/']);
      return;
    }
    return this.service.getPlaylist(playlistId).pipe(
      map(result=>{
        result.playlist = Object.values(result.playlist);
        result.playlist.forEach((val:any,ind)=>{
          val.ordered = ind + 1;
          val.thumbnail = this.service.getVideoThumbnail(val.id);
          val.url = "/view/"+val.id;
        })
        result.date = this.service.setDate(result.date);
        console.log(result);
        return result;
      })
    )
  }
  
}
