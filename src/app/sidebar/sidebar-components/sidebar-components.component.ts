import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-components',
  templateUrl: './sidebar-components.component.html',
  styleUrls: ['./sidebar-components.component.css']
})
export class SidebarComponentsComponent implements OnInit {
  @Input('value') private value:object;

  constructor() { }

  ngOnInit() {
  }

}
