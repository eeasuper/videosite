import { Component,HostBinding,OnInit,ViewChild,ElementRef,Renderer2,OnChanges} from '@angular/core';
import {ApiCallsService} from './services/api-calls.service';
import {SidebarService} from './services/sidebar.service';
import {Observable} from 'rxjs'
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RoutesRecognized,
  ChildActivationStart,
  ResolveEnd,
  ActivationEnd,
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loading = false;
  progressValue= 0;

  constructor( private service:ApiCallsService, private renderer:Renderer2,private router:Router){
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          this.progressValue= 10;
          break;
        }
        case event instanceof RoutesRecognized:{
          this.progressValue= 20;
        }
        case event instanceof ChildActivationStart:{
          this.progressValue= 40;
        }
        case event instanceof ResolveEnd:{
          this.progressValue=80;
        }
        case event instanceof ActivationEnd:{
          this.progressValue=90;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.progressValue = 100;
          this.loading = false;
          window.scrollTo(0, 0)
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit(){
    this.service.validateDecodeJWT();
  }



}
