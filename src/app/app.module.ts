import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';

import { userReducer } from './store/reducers/user.reducer';
import { AppComponent } from './app.component';
import {UserModule} from './store/user.module';
import {NavbarModule} from './navbar/navbar.module';
import {SidebarModule} from './sidebar/sidebar.module';
import {SidebarService} from './services/sidebar.service';
import {HomeModule} from './home/home.module'
import {ViewVideoModule} from './view-video/view-video.module'
import {ViewModule} from './view/view.module';
import {ViewPlaylistModule} from './view-playlist/view-playlist.module';
import { DirectivesModule } from './directives/directives.module';
import {ReusableComponentsModule} from './reusable-components/reusable-components.module'
import {DialogCloseComponent} from './reusable-components/dialog-close/dialog-close.component'
import {MatDialogModule } from '@angular/material/dialog'
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    UserModule,
    NavbarModule,
    SidebarModule,
    HomeModule,
    ViewVideoModule,
    ViewModule,
    ViewPlaylistModule,
    AppRoutingModule,
    DirectivesModule,
    ReusableComponentsModule,
    MatDialogModule
  ],
  providers: [
    SidebarService
  ],
  bootstrap: [AppComponent],
  entryComponents:[DialogCloseComponent]
})
export class AppModule { }
