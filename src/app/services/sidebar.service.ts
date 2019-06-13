import { Injectable,Output,EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  isOpen = true;

  @Output() change:EventEmitter<boolean> = new EventEmitter();

  toggle(open?:boolean){
    if(open == null){
      this.isOpen = !this.isOpen;
      this.change.emit(this.isOpen);
    }else{
      this.isOpen = open;
      this.change.emit(open);
    }
  }

  constructor() { }
}
