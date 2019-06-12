import { Component, OnInit,Input,OnChanges,ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-view-video-list',
  templateUrl: './view-video-list.component.html',
  styleUrls: ['./view-video-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewVideoListComponent implements OnInit,OnChanges {
  @Input('videos') private videos;
  @Input('pageIndex') private pageIndex;
  @Input('pageSize') private pageSize;
  constructor() { }
  public list;
  paginate (array, page_size, page_number) {
    if(page_number === 0){
      page_number = 0;
    }else{
      // --page_number; 
    }
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  }
  setList(list){
    this.list = this.paginate(this.videos, this.pageSize, this.pageIndex)
  }

  ngOnChanges(){
    this.setList(this.videos);
  }
  ngOnInit() {

  }

}

