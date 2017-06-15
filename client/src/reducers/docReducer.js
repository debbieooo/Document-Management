import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function docReducer(state = initialState.docs, action) {
  switch (action.type) {
    case types.LOAD_DOCUMENTS_SUCCESS:
    console.log('yooo', state);
      return [
        ...state,
        ...action.docs
      ];

    default:
      return state;
  }
}
