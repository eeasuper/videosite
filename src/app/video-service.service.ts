import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private serverUrl:String = "http://localhost:8080"

  constructor(private http: HttpClient) { }
  getVideo():Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'video/mp4' });
    const options = { headers: headers };
    return this.http.get(this.serverUrl+"/files/yui-ura-on.mp4",options);
  }
}
