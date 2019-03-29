import { Injectable } from '@angular/core';
import {Video} from './Video';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY,BehaviorSubject }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewVideoResolverService implements Resolve<Video>{

  constructor(private router: Router) {
    this.test.title = "This is a test title for developing purposes."
    this.test.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam rhoncus mi ac enim luctus efficitur. Praesent hendrerit dui at nisi elementum, aliquam ultricies sem vulputate. Aenean quis tortor sed augue fermentum auctor id vel dolor. Nulla diam ligula, dapibus bibendum sollicitudin et, varius non tellus. Nulla faucibus ac eros eu pharetra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla efficitur sagittis nisl, nec p";
    this.test.uploader ="test_uploader";
    this.test.views = 130203;
    this.test.published_date = new Date().getTime();
  }
  private test:Video = new Video();
  private test1:BehaviorSubject<Video> = new BehaviorSubject<Video>(this.test);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Video> | Observable<never> {
    return this.test1.asObservable().pipe(
      take(1),
      mergeMap(data=>{
        if(data){
          console.log(of(data));
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
