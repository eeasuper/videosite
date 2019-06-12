import { Component, OnInit,HostBinding,ChangeDetectionStrategy,OnDestroy,ChangeDetectorRef } from '@angular/core';
import {SidebarService} from '../services/sidebar.service';
import {User,selectUser} from '../store/selectors/index';
import { Store } from '@ngrx/store';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit,OnDestroy {

  @HostBinding('class.is-open')
  isOpen = true;
  subscriptions: Subscription = new Subscription();
  public myPlaylistsUrl;
  public unAuthenticated:any[] = [
    {
      name: 'Login',
      url: '/login',
      icon: '/assets/icons/user_icon_24.png',
      activatedIcon: '/assets/icons/playlist_icon_activated.png'
    },
    {
      name: 'Register',
      url: '/register',
      icon: '/assets/icons/blank.png',
      activatedIcon: '/assets/icons/playlist_icon_activated.png'
    },
    {
      name:'Trending',
      url: '/',
      icon: '/assets/icons/fire_icon.png',
      activatedIcon: '/assets/icons/fire_icon_activated.png'
    }
  ]
  public titles:object[] = this.unAuthenticated;
  constructor(private sidebar:SidebarService, private store:Store<any>,private cdRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.subscriptions.add(this.sidebar.change.subscribe(isOpen =>{
      this.isOpen = isOpen;
    }));
    this.subscriptions.add(this.store.select('user').subscribe(user=>{
      if(!user.isAuthenticated){
        this.titles = this.unAuthenticated;
      }else if(user.isAuthenticated){
        this.myPlaylistsUrl = '/playlist/'+user.user.id;
        let authenticated:object[] = [
          {
            name:'My Playlists',
            url: this.myPlaylistsUrl,
            icon: '/assets/icons/playlist_icon.png',
            activatedIcon: '/assets/icons/playlist_icon_activated.png'
          },
          {
            name:'Trending',
            url: '/',
            icon: '/assets/icons/fire_icon.png',
            activatedIcon: '/assets/icons/fire_icon_activated.png'
          }
        ]
        this.titles = authenticated;
        this.cdRef.markForCheck();
      }
    }));
  }
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}
