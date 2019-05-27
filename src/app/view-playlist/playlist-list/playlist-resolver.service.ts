import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY,BehaviorSubject }  from 'rxjs';
import { map}         from 'rxjs/operators';

import {Playlist} from '../Playlist';
import {ApiCallsService} from '../../services/api-calls.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistResolverService implements Resolve<Playlist[]> {

  constructor(private router: Router, private service:ApiCallsService) {
   }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Playlist[]> | Observable<never> {
    let userId = route.paramMap.get('userId');
    return this.service.getAllPlaylists(userId).pipe(
        map(data=>{
          if(data){
            data.forEach((val,ind)=>{
              val.playlist = Object.values(val.playlist);
              val.thumbnail = this.service.getVideoThumbnail(val.playlist[0].id);
              val.url = "/view/"+val.playlist[0].id;
              val.edit_url = "/playlist/"+val.userId+"/"+val.id+"/edit";
            })
            return data;
          }else{
            return EMPTY;
          }
        })
      )
    }
}
