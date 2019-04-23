import { Injectable } from '@angular/core';
// import { Response } from '@angular/http';
import { HttpClient,HttpHeaders, HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest, } from '@angular/common/http';
import { catchError, map, tap,switchMap } from 'rxjs/operators';
import {Observable,of,timer} from 'rxjs';
import {Router} from '@angular/router';
import {ValidationErrors,FormControl,AbstractControl} from '@angular/forms'
import { Store } from '@ngrx/store';
import {ActionTypes} from '../store/actions/user.actions';
import {MatSnackBar} from '@angular/material';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  private server:string = "http://localhost:8080"
  public ip:string;
  // lastViewedTime: CustomDate;
  private jwt:string = localStorage.getItem("jwtToken") ? localStorage.getItem("jwtToken"):null;
  private httpOptions = {
      // headers: new HttpHeaders({
      //   "Content-Type": "application/json",
      //   "Accept" : "application/json"
      // })
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.jwt}`
      })
    }
  constructor(private http:HttpClient, private route:Router,private store:Store<any>,private snackBar: MatSnackBar) { }

  getIP():Observable<any>{
    return this.http.get("https://api.ipify.org?format=json").pipe(
      catchError(this.handleError('getIP()', ''))
    )
  }

  // getCurrentTime():number{
  //   // let today = new Date();
  //   // return {
  //   //   'year': today.getFullYear(),
  //   //   'month': today.getMonth()+1,
  //   //   'day': today.getDate(),
  //   //   'hour': today.getHours(),
  //   //   'minutes': today.getMinutes(),
  //   //   'seconds': today.getSeconds()
  //   // }
  //   return new Date().getTime();
  // }

  getVideoSource(videoId:number){
    return this.server + "/video/view/"+videoId;
  }

  getVideoDescription(videoId:string):Observable<any>{
    return this.http.get(this.server+"/video/"+videoId).pipe(
      catchError(this.handleError('getVideoDescription()',''))
    )
  }

  // getVideoList(pageIndex:number,limit:number,userId:number):Observable<any>{
  getVideoList(userId:number):Observable<any>{
    //list should be ordered by date.
    //pageIndex should indicate the position of the list SQL should retrieve data.
    //limit indicates the amount of videos that should be attained starting from the position of the list 
    //(pageIndex * limit) should give the position of the list for SQL to start retrieving data.
    //In backend: SQL query limit by ASC or DESC order. and then send as response only the part of the query that client wants...or maybe it's just better to give the whole thing from the start?
    return this.http.get(this.server+"/video/"+userId+"/all").pipe(
      catchError(this.handleError('getVideoList()',''))
    )
    // return null;
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
    this.isLocalStorageJWTExists();
    this.http.put(this.server + "/playlist/"+playlist.id+"/edit/order-change",body,this.httpOptions).pipe(
      catchError(this.handleError('setPlaylistOrder()',''))
    ).subscribe(()=>{})
  }

  setPlaylistTitle(playlistId:number, title:string){
    this.isLocalStorageJWTExists();
    this.http.put(this.server+"/playlist/"+playlistId+"/edit/title-change", {"title":title},this.httpOptions).pipe(
      catchError(this.handleError('setPlaylistTitle()','',"Something went wrong. Title couldn't be set."))
    ).subscribe(()=>{})
  }

  deletePlaylist(playlistId:string){
    this.isLocalStorageJWTExists();
    this.http.delete(this.server+"/playlist/"+playlistId,this.httpOptions).pipe(
      catchError(this.handleError('deletePlaylist()',''))
    ).subscribe((val)=>{
      //https://stackoverflow.com/questions/46603088/angular-4-http-delete-not-working
      this.store.select('user').subscribe(user=>{
        this.route.navigate(["/playlist",user.user.id]);  
      })
    })
  }

  getUser(userId:string):Observable<any>{
    return this.http.get(this.server+"/user/"+userId).pipe(
      catchError(this.handleError('getUser()',''))
    )
  }

  uploadVideo(formData:FormData,userId:number):Observable<any>{
    this.isLocalStorageJWTExists();
    return this.http.post(this.server + "/upload/"+userId,formData,this.httpOptions).pipe(
      catchError(this.handleError('uploadVideo()',''))
    )
  }

  addVideoToPlaylist(playlistId:any, array:string[]):Observable<any>{
    let body = [];
    //localhost:4200/view/1?playlist=1
    array.forEach((val,ind)=>{
      let a = this.checkUrl(val);
      body.push({
        id: a
      })
    })
    console.log(playlistId);
    this.isLocalStorageJWTExists();
    return this.http.post(this.server + "/playlist/"+playlistId+"/edit/add-video",body,this.httpOptions).pipe(
      catchError(this.handleError('addVideoToPlaylist()',''))
    );
  }

  checkUrl(val:string){
    if(val.lastIndexOf("?") !== -1){
        return val.substring(val.lastIndexOf("view/")+5, val.lastIndexOf("?"));  
      }else{
        console.log("ff");
        return val.substring(val.lastIndexOf("view/")+5, val.length); 
      }
  }

  createPlaylist(playlistData:object):Observable<any>{
    this.isLocalStorageJWTExists();
    return this.http.post(this.server+"/playlist",playlistData,this.httpOptions).pipe(
      catchError(this.handleError('createPlaylist()',''))
    )
  }


  setVideoContent(videoId:number, title:string, description:string):Observable<any>{
    let body = {
      id: videoId,
      title: title,
      description: description
    }
    this.isLocalStorageJWTExists();
    return this.http.put(this.server+"/video", body,this.httpOptions).pipe(
      catchError(this.handleError('setVideoContent()',''))
    )
  }

  setViewCount(videoId:number,ip:string):Observable<any>{
    let body;
    // this.getIP().subscribe((res:any)=> {
    //   res.ip;
    //   //change date to actual new Date(). or just send date.getTime();
      body = {
        "ip": ip,
        "date": new Date().getTime(),
        "videoId": videoId
      }
      return this.http.post(this.server+"/addViewCount", body).pipe(
        catchError(this.handleError('setViewCount()',''))
      );
    // });
  }

  getViewCount(videoId:number):Observable<any>{
    return this.http.get(this.server+"/getViewCount/"+videoId).pipe(
      catchError(this.handleError('getViewCount()',''))
    )
  }

  login(user:any):Promise<any>{
    let body = {
      username: user.usernameControl,
      password: user.passwordControl
    }
    return new Promise((res,rej)=>{
      this.http.post(this.server+"/login", body, {observe: 'response'}).pipe(
        catchError(this.handleError('login()',''))
      ).toPromise().then((val:any)=>{
        console.log(val);
        //if user is successfully sent back:
        localStorage.setItem("jwtToken", val.body.token);
        if(val.status === 201){
          res(val.body);  
        }
        rej(null)
      }).catch((err)=>{
        console.log(err);
        rej(err);
      })
    })
  }
  logout(){
    localStorage.removeItem("jwtToken");
  }
  register(user:any):Promise<any>{
    let body = {
      username: user.usernameControl,
      password: user.passwordControl,
      name: user.nameControl,
      email: user.emailControl
    }
    return new Promise((res,rej)=>{
      this.http.post(this.server+"/register", body, {observe: 'response'}).pipe(
        catchError(this.handleError('register()',''))
      ).toPromise().then((val:any)=>{
        console.log(val);
        localStorage.setItem("jwtToken", val.body.token);
        if(val.status === 201){
          res(val.body);  
        }
      }).catch((err)=>{
          console.log(err);
          rej(err);
        })
    })
  }
  setDate(dateLong:number):string{
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    return new Date(dateLong).toLocaleDateString("en-US", options);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  isLocalStorageJWTExists():string{
    //If jwt token exists, append it to the httpHeader for verification else delete it.
    let jwt:string = localStorage.getItem("jwtToken") ? localStorage.getItem("jwtToken"):null;
    console.log(jwt);
    if(jwt){
      this.httpOptions.headers.append("Authorization", `Bearer ${jwt}`);
      return jwt;
    }else{
      this.httpOptions.headers.delete("Authorization");
      return null;
    }
  }

  validateDecodeJWT(){
    let jwt = jwt_decode(localStorage.getItem("jwtToken"));
    if(jwt!=null){
      this.store.dispatch({
          type: ActionTypes.SET_CURRENT_USER,
          payload: {
            username: jwt.sub,
            id: jwt.usr_id
          }
        })  
    }
  }

  private handleError<T> (operation = 'operation', result?: T,snackbarMessage?:string) {
    return (error: any): Observable<T> => {
     if(snackbarMessage){
       this.openSnackBar(snackbarMessage, "Okay")
     }
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      if(error.status === 404){
        this.route.navigate(['/notfound']);
      }
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