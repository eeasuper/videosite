import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {WindowSizeDirective} from './window-size.directive'

@NgModule({
  declarations: [WindowSizeDirective],
  imports: [
    CommonModule,
  ],
  exports:[WindowSizeDirective
  ]
})
export class WindowSizeDirectiveModule { }
