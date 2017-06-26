import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function searchReducer(state = initialState.search, action) {
  switch (action.type) {
    case types.SEARCH_SUCCESS:
    console.log('action', action);
      return Object.assign({}, state, { search: [...action.search], metadata: [...action.metadata] });
    default:
      return state;
  }
}


