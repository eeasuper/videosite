import { Injectable } from '@angular/core';
// import { Response } from '@angular/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable,of} from 'rxjs';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  private server:string = "http://localhost:8080"
  public ip:string;
  // lastViewedTime: CustomDate;
  private httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept" : "application/json"
      })
    }
  constructor(private http:HttpClient, private route:Router) { }

  getIP():Observable<any>{
    return this.http.get("https://api.ipify.org?format=json").pipe(
      catchError(this.handleError('getIP()', ''))
    )
  }

  getCurrentTime():number{
    // let today = new Date();
    // return {
    //   'year': today.getFullYear(),
    //   'month': today.getMonth()+1,
    //   'day': today.getDate(),
    //   'hour': today.getHours(),
    //   'minutes': today.getMinutes(),
    //   'seconds': today.getSeconds()
    // }
    return new Date().getTime();
  }

  getVideoSource(videoId:number){
    return this.server + "/video/view/"+videoId;
  }

  getVideoDescription(videoId:string):Observable<any>{
    return this.http.get(this.server+"/video/"+videoId).pipe(
      catchError(this.handleError('getVideoDescription()',''))
    )
  }

  getVideoRecentList(userId:string):Observable<any>{
    return this.http.get(this.server+"/video/"+userId+"/recent").pipe(
        catchError(this.handleError('getVideoRecentList()',''))
      )
  }

  getVideoRandomList(): Observable<any>{
    // 1. Get video model of each video
    // 2. put respective video id into each image...
    return this.http.get(this.server + "/video/random").pipe(
        catchError(this.handleError('getVideoRandomList()',''))
      )
  }

  getPlaylist(playlistId:string):Observable<any>{
    return this.http.get(this.server + "/playlist/"+playlistId).pipe(
      catchError(this.handleError('getPlaylist()',''))
    )
  }

  getVideoThumbnail(videoId:string):string{
    return this.server + "/video/"+videoId+"/thumbnail"
  }

  getAllPlaylists(userId:string):Observable<any>{
    return this.http.get(this.server + "/user/"+userId+"/playlist").pipe(
      catchError(this.handleError('getAllPlaylists()',''))
    )
  }

  setPlaylistOrder(playlist:any){
    //maybe change any to interface later.
    let list = playlist.playlist;
    let body = {}
    list.forEach((val,ind)=>{
      body[ind+1] = {
        "id": val.id
      }
    })
    console.log(body);
    this.http.put(this.server + "/playlist/"+playlist.id+"/edit/order-change",body).pipe(
      catchError(this.handleError('setPlaylistOrder()',''))
    ).subscribe(()=>{
    })
  }

  deletePlaylist(playlistId:string){
    this.http.delete(this.server+"/playlist/"+playlistId).pipe(
      catchError(this.handleError('deletePlaylist()',''))
    ).subscribe((val)=>{
      //https://stackoverflow.com/questions/46603088/angular-4-http-delete-not-working
      this.route.navigate(["/"]);
    })
  }

  getUser(userId:string):Observable<any>{
    return this.http.get(this.server+"/user/"+userId).pipe(
      catchError(this.handleError('getUser()',''))
    )
  }

  uploadVideo(formData:FormData,userId:number):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "random_lol",
      })
    }
    return this.http.post(this.server + "/upload/"+userId,formData,httpOptions).pipe(
      catchError(this.handleError('uploadVideo()',''))
    )
  }

  addVideoToPlaylist(playlistId:any, array:string[]):Observable<any>{
    let body = [];
    //localhost:4200/view/1?playlist=1
    array.forEach((val,ind)=>{
      let a = val.substring(val.lastIndexOf("view/")+5, val.lastIndexOf("?"));
      console.log(a);
      body.push({
        id: a
      })
    })
    return this.http.post(this.server + "/playlist/"+playlistId+"/edit/add-video",body).pipe(
      catchError(this.handleError('addVideoToPlaylist()',''))
    );
  }

  setVideoContent(videoId:number, title:string, description:string):Observable<any>{
    let body = {
      id: videoId,
      title: title,
      description: description
    }
    return this.http.put(this.server+"/video", body).pipe(
      catchError(this.handleError('setVideoContent()',''))
    )
  }

  setViewCount(videoFile:string){
    if(!this.ip){
      this.getIP().subscribe((res:any)=> {
        this.ip=res.ip;
        //change date to actual new Date(). or just send date.getTime();
        let body = {
          "ip": this.ip,
          "date": this.getCurrentTime(),
          "fileName": videoFile
        }
        console.log(body);
        this.http.post(this.server+"/addViewCount", body).pipe(
          catchError(this.handleError('setViewCount()',''))
        ).subscribe((val)=>{
          console.log(val);
        })
      });
    }
  }

  setDate(dateLong:number):string{
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    return new Date(dateLong).toLocaleDateString("en-US", options);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // private log(message: string) {
  //   this.messageService.add(`HeroService: ${message}`);
  // }
}


/*
  debounceViewCount():boolean{
    //should be making api call here to get last viewed time.
    // let vt = this.lastViewedTime;
    //year is 2019, minute is accurate, date is accurate all other numbers should be lowered by 1. Also remember hour goes by the 24 hour clock.
    let vt = {
      'year': 2019,
      'month': 2,
      'day': 13,
      'hour': 13,
      'minutes': 0,
      'seconds': 0
    }  
    let now = new Date();
    let now1 = new Date(now.getFullYear(), now.getMonth(), now.getDate(),now.getHours(), now.getMinutes(), now.getSeconds())
    //3600000 is ms for 1 hour.
    var diff = Math.abs((now1.getTime() - new Date(vt.year, vt.month, vt.day, vt.hour, vt.minutes, vt.seconds).getTime())/3600000);
    if(diff > 1){
      console.log("ff");
      return true;
    }
    console.log("f");
    return false;
  }
*/

// export interface CustomDate{
//   'year': number,
//   'month':number,
//   'day':number,
//   'hour':number,
//   'minutes':number,
//   'seconds':number
// }