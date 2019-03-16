import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { userReducer } from './store/reducers/user.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UserModule} from './store/user.module';
import {NavbarModule} from './navbar/navbar.module';
import {SidebarModule} from './sidebar/sidebar.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    UserModule,
    NavbarModule,
    SidebarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
