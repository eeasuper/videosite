import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest, } from '@angular/common/http';
import { catchError, map, tap,switchMap,take,concatMap,retry } from 'rxjs/operators';
import {Observable,of,timer,concat,throwError } from 'rxjs';
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
  // private server:string = "http://localhost:8080"
  private server:string = "https://video-site-backend.herokuapp.com"
  public ip:string;
  private jwt:string = localStorage.getItem("jwtToken") ? localStorage.getItem("jwtToken"):null;
  private httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.jwt}`
      })
    }
  constructor(private http:HttpClient, private route:Router,private store:Store<any>,private snackBar: MatSnackBar) { }

  getIP():Observable<any>{
    return this.http.get("https://api.ipify.org?format=json").pipe(
      take(1),
      catchError(this.handleError('getIP()', ''))
    )
  }

  getVideoSource(videoId:number){
    return this.server + "/video/view/"+videoId;
  }

  getVideoDescription(videoId:string):Observable<any>{
    return this.http.get(this.server+"/video/"+videoId).pipe(
      take(1),
      catchError(this.handleError('getVideoDescription()',''))
    )
  }

  getVideoList(userId:number):Observable<any>{
    return this.http.get(this.server+"/video/"+userId+"/all").pipe(
      take(1),
      catchError(this.handleError('getVideoList()',''))
    )
  }

  getVideoRecentList(userId:string):Observable<any>{
    return this.http.get(this.server+"/video/"+userId+"/recent").pipe(
      take(1),
      catchError(this.handleError('getVideoRecentList()',''))
    )
  }

  getVideoRandomList(): Observable<any>{
    return this.http.get(this.server + "/video/random").pipe(
        take(1),
        catchError(this.handleError('getVideoRandomList()',''))
      )
  }

  getPlaylist(playlistId:string):Observable<any>{
    return this.http.get(this.server + "/playlist/"+playlistId).pipe(
      take(1),
      catchError(this.handleError('getPlaylist()',''))
    )
  }

  getVideoThumbnail(videoId:string):string{
    return this.server + "/video/"+videoId+"/thumbnail"
  }

  getAllPlaylists(userId:string):Observable<any>{
    return this.http.get(this.server + "/user/"+userId+"/playlist").pipe(
      take(1),
      catchError(this.handleError('getAllPlaylists()',''))
    )
  }

  setPlaylistOrder(playlist:any){
    let httpOptions = this.isLocalStorageJWTExists();
    let list = playlist.playlist;
    let body = {}
    list.forEach((val,ind)=>{
      body[ind+1] = {
        "id": val.id
      }
    })
    this.http.put(this.server + "/playlist/"+playlist.id+"/edit/order-change",body,httpOptions).pipe(
      take(1),
      catchError(this.handleError('setPlaylistOrder()',''))
    ).subscribe(()=>{})
  }

  setPlaylistTitle(playlistId:number, title:string){
    let httpOptions = this.isLocalStorageJWTExists();
    this.http.put(this.server+"/playlist/"+playlistId+"/edit/title-change", {"title":title},httpOptions).pipe(
      take(1),
      catchError(this.handleError('setPlaylistTitle()','',"Something went wrong. Title couldn't be set."))
    ).subscribe(()=>{})
  }

  deletePlaylist(playlistId:string,userId:number){
    let httpOptions = this.isLocalStorageJWTExists();
    this.http.delete(`${this.server}/playlist/${playlistId}/${userId}`,httpOptions).pipe(
      take(1),
      catchError(this.handleError('deletePlaylist()','Could not delete playlist'))
    ).subscribe((val)=>{
      this.store.select('user').subscribe(user=>{
        this.route.navigate(["/playlist",user.user.id]);  
      })
    })
  }

  getUser(userId:string):Observable<any>{
    return this.http.get(this.server+"/user/"+userId).pipe(
      take(1),
      catchError(this.handleError('getUser()',''))
    )
  }

  uploadVideo(formData:FormData,userId:number):Observable<any>{
    let httpOptions = this.isLocalStorageJWTExists();
    return this.http.post(this.server + "/upload/"+userId,formData,httpOptions).pipe(
      take(1),
      catchError(this.handleError('uploadVideo()',''))
    )
  }

  addVideoToPlaylist(playlistId:any, array:string[]):Observable<any>{
    let httpOptions = this.isLocalStorageJWTExists();
    let body = [];
    array.forEach((val,ind)=>{
      let a = this.checkUrl(val);
      body.push({
        id: a
      })
    })
    return this.http.post(this.server + "/playlist/"+playlistId+"/edit/add-video",body,httpOptions).pipe(
      take(1),
      catchError(this.handleError('addVideoToPlaylist()',''))
    );
  }

  checkUrl(val:string){
    // Get rid of query parameter.
    if(val.lastIndexOf("?") !== -1){
        return val.substring(val.lastIndexOf("view/")+5, val.lastIndexOf("?"));  
      }else{
        return val.substring(val.lastIndexOf("view/")+5, val.length); 
      }
  }

  createPlaylist(playlistData:object,videoUrlsForPlaylist:string[]):Observable<any>{
    let httpOptions = this.isLocalStorageJWTExists();
    return this.http.post(this.server+"/playlist",playlistData,httpOptions).pipe(
      take(1),
      catchError(this.handleError('createPlaylist()','')),
      concatMap((newPlaylist:any)=>{
        return this.addVideoToPlaylist(newPlaylist.id,videoUrlsForPlaylist)
      })
    )
  }

  setVideoContent(videoId:number, title:string, description:string):Observable<any>{
    let httpOptions = this.isLocalStorageJWTExists();
    let body = {
      id: videoId,
      title: title,
      description: description
    }
    return this.http.put(this.server+"/video", body,httpOptions).pipe(
      take(1),
      catchError(this.handleError('setVideoContent()',''))
    )
  }

  setViewCount(videoId:number,ip:string):Observable<any>{
    let body = {
      "ip": ip,
      "date": new Date().getTime(),
      "videoId": videoId
    }
    return this.http.post(this.server+"/addViewCount", body).pipe(
      take(1),
      catchError(this.handleError('setViewCount()',''))
    );
  }

  getViewCount(videoId:number):Observable<any>{
    return this.http.get(this.server+"/getViewCount/"+videoId).pipe(
      take(1),
      catchError(this.handleError('getViewCount()',''))
    )
  }

  getSearch(title:string):Observable<any>{
    return this.http.get(this.server+"/search/"+title).pipe(
      take(1),
      catchError(this.handleError('getSearch()',''))
    )
  }

  login(user:any):Promise<any>{
    return new Promise((res,rej)=>{
      this.http.post(this.server+"/login", user, {observe: 'response'}).pipe(
        take(1),
        catchError(this.handleError('login()',''))
      ).toPromise().then((val:any)=>{
        let authorization = val.headers.get("Authorization")
        authorization != null ? localStorage.setItem("jwtToken", authorization):null;
        if(val.status === 201){
          this.isLocalStorageJWTExists();
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
        take(1),
        catchError(this.handleError('register()',''))
      ).toPromise().then((val:any)=>{
        let authorization = val.headers.get("Authorization")
        authorization != null ? localStorage.setItem("jwtToken", authorization):null;
        if(val.status === 201){
          this.isLocalStorageJWTExists();
          res(val.body);  
        }
      }).catch((err)=>{
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

  isLocalStorageJWTExists():any{
    //If jwt token exists, append it to the httpHeader for verification else delete it.
    let jwt:string = localStorage.getItem("jwtToken") ? localStorage.getItem("jwtToken"):null;
    if(jwt){
        let httpOptions = {
          headers: new HttpHeaders({
            "Authorization": `Bearer ${jwt}`
          })
        }
      this.httpOptions = httpOptions;
      return httpOptions;
    }else{
      this.httpOptions.headers.delete("Authorization");
      return null;
    }
  }

  validateDecodeJWT(){
    let jwt = localStorage.getItem("jwtToken")!=null?jwt_decode(localStorage.getItem("jwtToken")):null;
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
      // console.log(operation);
      if(operation === "getAllPlaylists()"){
        this.route.navigate(['playlist/no-playlist']);
        return throwError("no-playlist");
      }
      if(snackbarMessage){
        this.openSnackBar(snackbarMessage, "Okay")
      }
      if(error.status === 0){
         this.route.navigate(['/unreachable']);
         return throwError("unreachable");
      }
      if(error.status === 404){
        this.route.navigate(['/notfound']);
        return throwError('notfound');
      }

      if(error.status.toString().startsWith("4") || error.status.toString().startsWith("5")){
        this.route.navigate(['/error',error.status]);
      }
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
