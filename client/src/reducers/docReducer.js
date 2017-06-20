import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function docReducer(state = initialState.docs, action) {
  switch (action.type) {
    case types.LOAD_DOCUMENTS_SUCCESS:
      // return [
      //   ...state,
      //   ...action.docs
      // ];
      // const docs = {
      //   ..
      // }
      return Object.assign({}, state, { docs: [...state, ...action.docs] });
    case types.DELETE_DOCUMENTS_SUCCESS:
    // console.log('yes it happened');
      return Object.assign({}, state, { docs: [...state.docs].filter((doc) => {
        if (doc.id !== action.id) {
          // console.log('hey i have an id', doc.id, action.id);
          return doc;
        }
      }) });
    case types.UPDATE_DOCUMENTS_SUCCESS:
      return Object.assign({}, state, { docs: [...state.docs].map((doc) => {
        if (doc.id === action.doc.id) {
          return action.doc;
        }
        return doc;
      }) });
    case types.FETCH_DOCUMENT_SUCCESS:
      return Object.assign({}, state, { doc: action.doc });

    case types.CREATE_DOCUMENTS_SUCCESS:
      return Object.assign({}, state, action.doc);

    default:
      return state;
  }
}
