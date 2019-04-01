import { Component, OnInit,HostBinding } from '@angular/core';
import {SidebarService} from '../services/sidebar.service';
import {User,selectUser} from '../store/selectors/index';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @HostBinding('class.is-open')
  isOpen = true;

  private titles:object[] = [
    {
      name:'My Playlists',
      url: '/playlist/1',
      icon: '/assets/icons/playlist_icon.png',
      activatedIcon: '/assets/icons/playlist_icon_activated.png'
    },
    {
      name:'Trending',
      url: '/playlist/1',
      icon: '/assets/icons/fire_icon.png',
      activatedIcon: '/assets/icons/fire_icon_activated.png'
    }
  ]
  private unAuthenticated:object[] = [
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
    }
  ]
  constructor(private sidebar:SidebarService, private store:Store<any>) { }

  ngOnInit() {
    this.sidebar.change.subscribe(isOpen =>{
      this.isOpen = isOpen;
    })
    this.store.select('user').subscribe(user=>{
      // console.log(user);
      if(!user.isAuthenticated){
        this.titles = this.unAuthenticated;
      }
    })
  }

}
