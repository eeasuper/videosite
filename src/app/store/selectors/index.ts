import { createSelector } from '@ngrx/store';

export interface User{
  username: string,
  id: number
}

export interface AppState{
  user: User
}

export const selectUser = (state:AppState) => state.user;

export const selectUserName = createSelector(
  selectUser,
  (state:User) => state.username
);