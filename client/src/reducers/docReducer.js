import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function docReducer(state = initialState.docs, action) {
  switch (action.type) {
    case types.LOAD_DOCUMENTS_SUCCESS:
      return [
        ...state,
        ...action.docs
      ];
    case types.DELETE_DOCUMENTS_SUCCESS:
    // console.log('yes it happened');
      return [...state].filter((doc) => {
        if (doc.id !== action.id) {
          // console.log('hey i have an id', doc.id, action.id);
          return doc;
        }
      });
    case types.UPDATE_DOCUMENTS_SUCCESS:
      return [...state].map((doc) => {
        if (doc.id === action.doc.id) {
          return action.doc;
        }
        return doc;
      });


    default:
      return state;
  }
}
