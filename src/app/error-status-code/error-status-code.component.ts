import { Component, OnInit,OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-error-status-code',
  templateUrl: './error-status-code.component.html',
  styleUrls: ['./error-status-code.component.css']
})
export class ErrorStatusCodeComponent implements OnInit,OnDestroy {
  error;
  routeSubscription:Subscription;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params)=>{
      this.error = params['status_code']
    })
  }

  ngOnDestroy(){
    this.routeSubscription.unsubscribe();
  }

}
