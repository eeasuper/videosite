import { Component, OnInit,Input,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sidebar-components',
  templateUrl: './sidebar-components.component.html',
  styleUrls: ['./sidebar-components.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponentsComponent implements OnInit {
  @Input('value') public value:any;

  constructor() { }

  ngOnInit() {
  }

}
