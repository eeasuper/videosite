import { Component, OnInit,Output,EventEmitter,Input,ViewChild,ElementRef} from '@angular/core';

@Component({
  selector: 'app-dumb-view-video',
  templateUrl: './dumb-view-video.component.html',
  styleUrls: ['./dumb-view-video.component.css']
})
export class DumbViewVideoComponent implements OnInit {
  @ViewChild('videoPlayer') video:ElementRef;
  @Output('onEnded') ended = new EventEmitter<null>();
  @Input('currentVideo') currentVideo;
  @Input('playlist') playlist;
  @Input('videoSource') videoSource;
  onEnded(){
    this.ended.emit();
  }
  
  constructor() { }

  ngOnInit() {
    //========load() is called so that video is loaded with new src when data is updated.
    this.video.nativeElement.load();
  }

}
