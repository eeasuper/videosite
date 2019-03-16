import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private titles:object = {
    playlist:{
      name:'Playlist',
      url: '/test',
      icon: '/assets/icons/playlist_icon.png',
      activatedIcon: '/assets/icons/playlist_icon_activated.png'
    },
    trending:{
      name:'Trending',
      url: '/test',
      icon: '/assets/icons/fire_icon.png',
      activatedIcon: '/assets/icons/fire_icon_activated.png'
    }
  } 
  private objectValues = Object.values;

  constructor() { }

  ngOnInit() {
  }

}
