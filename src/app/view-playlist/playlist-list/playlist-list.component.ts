import { Component, OnInit,Input,HostListener,Renderer2,ElementRef,ViewChild,OnDestroy,ChangeDetectionStrategy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Playlist} from '../../Playlist';
import {ApiCallsService} from '../../services/api-calls.service';
import { Store } from '@ngrx/store';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-playlist-list',
  template: '<app-dumb-playlist-list [playlists]="playlists" [loggedInId]="loggedInId"></app-dumb-playlist-list>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistListComponent implements OnInit,OnDestroy {

  public playlists:Playlist[];    
  private objectValues = Object.values;
  private loggedInId:number;
  private subscription:Subscription = new Subscription();

  constructor(private store:Store<any>,private element:ElementRef,private renderer:Renderer2, private router:Router,private route: ActivatedRoute, private service:ApiCallsService) { }

  ngOnInit() {
    this.subscription.add(this.route.data
      .subscribe((data: { playlists: Playlist[] }) => {
        /*Make playlist be in descending order( from most recent to oldest)*/
        data.playlists.sort((a,b)=>a.date + b.date);
        data.playlists.map((val,ind)=>{
          val.date = this.service.setDate(val.date);
        })
        this.playlists = data.playlists;
    }));
    this.subscription.add(this.store.select('user').subscribe(user=>{
      this.loggedInId = user.user.id      
    }));
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
