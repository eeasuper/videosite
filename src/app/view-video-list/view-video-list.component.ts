import { Component, OnInit,Input,OnChanges} from '@angular/core';

@Component({
  selector: 'app-view-video-list',
  templateUrl: './view-video-list.component.html',
  styleUrls: ['./view-video-list.component.css']
})
export class ViewVideoListComponent implements OnInit,OnChanges {
  @Input('videos') private videos;
  @Input('pageIndex') private pageIndex;
  @Input('pageSize') private pageSize;
  constructor() { }
  private list;
  paginate (array, page_size, page_number) {
    if(page_number === 0){
      page_number = 0;
    }else{
      // --page_number; 
    }
    // because pages logically start with 1, but technically with 0
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  }
  setList(list){
    //[1,2,3,4,5], 2 
    this.list = this.paginate(this.videos, this.pageSize, this.pageIndex)
  }

  ngOnChanges(){
    this.setList(this.videos);
    console.log(this.list);
    console.log(this.pageIndex)
  }
  ngOnInit() {

  }

}

