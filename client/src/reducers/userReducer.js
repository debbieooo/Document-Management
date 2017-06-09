import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  console.log('initialStatessss', initialState);
  switch (action.type) {
// case types.LOAD_USERS_SUCCESS:
// action.users;
// user in single letter
    case types.CREATE_USER_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.user)
      ];
    case types.LOGIN_USER_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.user)
      ];
    case types.LOAD_USER_SUCCESS:
      return action.user;

    default:
      return state;
  }
}
