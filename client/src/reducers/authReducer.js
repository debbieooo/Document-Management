import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.authUser, action) {
  switch (action.type) {

    case types.CREATE_USER_SUCCESS: {
      const user = {
        ...action.user,
        isAuthenticated: true
      };
      return Object.assign({}, state, user);
    }

    case types.LOGIN_USER_SUCCESS: {
      const user = {
        ...action.user,
        isAuthenticated: true
      };
      return Object.assign({}, state, user);
    }
    default:
      return state;
  }
}
