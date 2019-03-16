import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './navbar.component';
import { MenuButtonComponent } from './menu-button/menu-button.component'

@NgModule({
  declarations: [
    NavbarComponent,
    MenuButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class NavbarModule { }
