import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import {userReducer} from './reducers/user.reducer';

//This module sets initial state into app 'eagerly.' For more details: https://ngrx.io/guide/store/reducers

@NgModule({
  imports: [StoreModule.forFeature('user', userReducer)],
})
export class UserModule {}