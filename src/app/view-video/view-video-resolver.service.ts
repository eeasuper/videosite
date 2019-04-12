import { Injectable } from '@angular/core';
import {Video} from './Video';
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
    this.test.title = "This is a test title for developing purposes."
    this.test.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam rhoncus mi ac enim luctus efficitur. Praesent hendrerit dui at nisi elementum, aliquam ultricies sem vulputate. Aenean quis tortor sed augue fermentum auctor id vel dolor. Nulla diam ligula, dapibus bibendum sollicitudin et, varius non tellus. Nulla faucibus ac eros eu pharetra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla efficitur sagittis nisl, nec p";
    this.test.uploader ="test_uploader";
    this.test.views = 130203;
    this.test.id = 1;
    this.test.published_date = new Date().getTime();
  }
  private test:Video = new Video();
  private test1:BehaviorSubject<Video> = new BehaviorSubject<Video>(this.test);
  private viewPlaylist;
  //playlistSubject should be replaced with an API call later.
  private playlistList:object = {
    playlist1:{
      name: 'exampleplaylist',
      created: 'December 1st 2018',
      id: 1,
      list:[
        {
          h3: 'Yui-Ura-On!!!',
          thumbnail: '/assets/seeding-thumbnail.png',
          uploader: 'example uploader',
          views: 'example views',
          order: 1,
          url: '/view/1',
          id:1
        },
        {
          h3: 'Yui-Ura-On!!! 2',
          thumbnail: '/assets/seeding-thumbnail.png',
          uploader: 'example uploader2',
          views: 'example views2',
          order: 3,
          url: '/view/1',
          id:2
        },
        {
          h3: 'Yui-Ura-On!!! 3',
          thumbnail: '/assets/seeding-thumbnail.png',
          uploader: 'example uploader3',
          views: 'example views3',
          order: 2,
          url: '/view/1',
          id:3
        },
        {
          h3: 'Yui-Ura-On!!! 4',
          thumbnail: '/assets/seeding-thumbnail.png',
          uploader: 'example uploader3',
          views: 'example views3',
          order: 4,
          url: '/view/1',
          id:4
        },
        {
          h3: 'Yui-Ura-On!!! 6',
          thumbnail: '/assets/seeding-thumbnail.png',
          uploader: 'example uploader3',
          views: 'example views3',
          order: 6,
          url: '/view/1',
          id:6
        },
        {
          h3: 'Yui-Ura-On!!! 5',
          thumbnail: '/assets/seeding-thumbnail.png',
          uploader: 'example uploader3',
          views: 'example views3',
          order: 5,
          url: '/view/1',
          id:5
        }
      ]
    },
    playlist2:{
      name: 'exampleplaylist2',
      created: 'December 2nd 2018',
      list:{
        video1:{
          h3: 'Yui-Ura-On!!!',
          thumbnail: '/assets/seeding-thumbnail.png',
          uploader: 'example uploader',
          views: 'example views',
          order: 3
        },
        video2:{
          h3: 'Yui-Ura-On!!! 2',
          thumbnail: '/assets/seeding-thumbnail.png',
          uploader: 'example uploader2',
          views: 'example views2',
          order: 2
        },
        video3:{
          h3: 'Yui-Ura-On!!! 3',
          thumbnail: '/assets/seeding-thumbnail.png',
          uploader: 'example uploader3',
          views: 'example views3',
          order: 1
        }
      }
    }
  }


  private playlistSubject:BehaviorSubject<any> = new BehaviorSubject<any>(this.playlistList);
//https://stackoverflow.com/questions/48146996/angular-4-how-to-return-multiple-observables-in-resolver?rq=1
  getIP():Observable<any>{
    return this.http.get("https://api.ipify.org?format=json").pipe(
      // catchError(this.handleError('getIP()', ''))
    )
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    let videoId = route.paramMap.get('videoid');
    this.test.id = parseInt(videoId);
    this.viewPlaylist = route.queryParams['playlist'];
    let playlist;
    this.playlistSubject.subscribe((val)=>{
      playlist = val.playlist1;
    })
    //api:
    /*
      call backend with playlist Id and videoId.if videoId is included in the playlist searched, return the playlist data.
    */
    // let result = [];
/*
 this.playlist.playlist = Object.values(this.playlist.playlist);
    this.playlist.playlist.forEach((val:any,ind)=>{
      val.ordered = ind + 1;
      val.thumbnail = this.service.getVideoThumbnail(val.id);
      val.url = "/view/"+val.id;
    })
*/
    //=====in production stage use backend connection return below:
    console.log("going through resolver")
    if(this.viewPlaylist){
      return forkJoin(
        this.service.getVideoDescription(videoId),
        this.service.getPlaylist(this.viewPlaylist).pipe(
          map(result=>{
            result.playlist = Object.values(result.playlist);
            result.playlist.forEach((val:any,ind)=>{
              val.ordered = ind + 1;
              val.thumbnail = this.service.getVideoThumbnail(val.id);
              val.url = "/view/"+val.id;
            })
            console.log(result);
            return result;
          })
          )
      )
    }
    return this.service.getVideoDescription(videoId)
    //When testing use the return below.
    // return this.test1.asObservable().pipe(
    //     take(1),
    //     mergeMap(data=>{
    //       if(this.viewPlaylist){
    //         // console.log(of([data, playlist]));
    //         return of([data, playlist]);
    //       }
    //       if(data){
    //         return of([data]);
    //       }else{
    //         this.router.navigate(['/']);
    //         return EMPTY;
    //       }
    //     })
    //   );
  // console.log(a);
  // return a;
  }
  
  pipe(ob:Observable<any>):Observable<any>{
    return ob.pipe(
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
