import { Component, OnInit,Output,ChangeDetectionStrategy,EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-dumb-profile',
  templateUrl: './dumb-profile.component.html',
  styleUrls: ['./dumb-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DumbProfileComponent implements OnInit {
  @Output('openPlaylistDialog') openPd = new EventEmitter<null>();
  @Output('openUploadDialog') openUd = new EventEmitter<null>();
  @Input('user') public user;
  @Input('authorized') public authorized:boolean=false;
  
  openUploadDialog(){
    this.openUd.emit(null);
  }

  openPlaylistDialog(){
    this.openPd.emit(null);
  }

  constructor() { }

  ngOnInit() {
  }

}
