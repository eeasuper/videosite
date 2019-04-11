import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './navbar.component';
import { MenuButtonComponent } from './menu-button/menu-button.component'
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    NavbarComponent,
    MenuButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class NavbarModule { }
