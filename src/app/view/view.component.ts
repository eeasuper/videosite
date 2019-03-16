import { Component, OnInit,HostBinding,ViewChild,ElementRef,Renderer2 } from '@angular/core';
import {SidebarService} from '../services/sidebar.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  @HostBinding('class.is-open-view')
  isOpen = true;

  constructor(private sidebar:SidebarService) { }

  ngOnInit() {
    this.sidebar.change.subscribe(isOpen =>{
      this.isOpen = isOpen;
    })
  }

}
