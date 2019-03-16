import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarComponent} from './sidebar.component';
import { SidebarComponentsComponent } from './sidebar-components/sidebar-components.component';
@NgModule({
  declarations: [
    SidebarComponent,
    SidebarComponentsComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SidebarComponent
  ]
})
export class SidebarModule { }
