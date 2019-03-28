import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {WindowSizeDirective} from './window-size.directive';
import { DraggableDirective } from './draggable.directive'

@NgModule({
  declarations: [WindowSizeDirective, DraggableDirective],
  imports: [
    CommonModule,
  ],
  exports:[WindowSizeDirective,
  DraggableDirective
  ]
})
export class DirectivesModule { }
