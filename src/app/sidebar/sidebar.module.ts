import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarComponent} from './sidebar.component';
import { SidebarComponentsComponent } from './sidebar-components/sidebar-components.component';
import {RouterModule} from '@angular/router';
@NgModule({
  declarations: [
    SidebarComponent,
    SidebarComponentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    SidebarComponent
  ]
})
export class SidebarModule { }
