import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-playlist',
  template: '<router-outlet></router-outlet>',
  styles: [':host { width: 100%; margin-top: -20px;}']
})
export class ViewPlaylistComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
