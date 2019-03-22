import { Component, OnInit,Input,HostListener,Renderer2,ElementRef,ViewChild} from '@angular/core';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {
  @Input('data') private data;
  private objectValues = Object.values;
  private width;

  constructor(private element:ElementRef,private renderer:Renderer2) { }
// constructor(){}
  ngOnInit() {
    // console.log(this.test);
  }

}
