import { Injectable,Output,EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  isOpen = true;

  @Output() change:EventEmitter<boolean> = new EventEmitter();

  toggle(){
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }

  // toggleForDownSize(hasClosed:boolean,windowWidth:number){
  //   if(windowWidth <=850 && wasOpen){
  //     this.isOpen = !this.isOpen;
  //     this.change.emit(this.isOpen);
  //   }else if(windowWidth ){

  //   }
  // }

  constructor() { }
}
