import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import {SearchResolverService} from './search-resolver.service';
import {RouterModule} from '@angular/router';
import {ViewVideoListModule} from '../view-video-list/view-video-list.module';
import {MatPaginatorModule} from '@angular/material/paginator';
@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    RouterModule,
    ViewVideoListModule,
    MatPaginatorModule
  ],
  exports:[
    SearchComponent
  ],
  providers:[
   SearchResolverService
  ]
})
export class SearchModule { }
