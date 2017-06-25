import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.users, action) {
  switch (action.type) {
    case types.LOAD_USERS_SUCCESS:
    console.log('action.users', action.users);
      console.log('state.action', state);
      return [
        ...state,
        ...action.users
      ];

    case types.DELETE_USER_SUCCESS:
      return [...state].filter((user) => {
        if (user.id !== action.id) {
          return user;
        }
      });


    default:
      return state;
  }
}
