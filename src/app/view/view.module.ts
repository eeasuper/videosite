import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view.component';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:[
    ViewComponent
  ]
})
export class ViewModule { }
