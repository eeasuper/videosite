import { Action } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

export interface State {
  isAuthenticated: boolean,
  user: object
}

export const initialState:State= {
  isAuthenticated: false,
  user: {}
};

export function userReducer(state = initialState, action: UserActions.Union) {
  switch (action.type) {
    case UserActions.ActionTypes.SET_CURRENT_USER:
      return {
        isAuthenticated: !!Object.keys(action.payload.username).length,
        user: action.payload
      }
    default:
      return state;
  }
}