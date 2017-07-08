import * as types from '../actions/actionTypes';
import initialState from './initialState';
/**
 * 
 * 
 * @export
 * @param {any} [state=initialState.documents] 
 * @param {any} action 
 * @returns {object} state
 */
export default function docReducer(state = initialState.documents, action) {
  switch (action.type) {
    case types.LOAD_DOCUMENTS_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          documents: action.documents.documents.rows,
          metadata: action.documents.metadata
        }
      );
    case types.DELETE_DOCUMENTS_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          documents: [...state.documents].filter((document) => {
            if (document.id !== action.id) {
              return document;
            }
            return undefined;
          })
        }
      );
    case types.UPDATE_DOCUMENTS_SUCCESS:
      return Object.assign(
        {},
        state,
        { documents: [...state.documents].map((document) => {
          if (document.id === action.document.id) {
            return Object.assign({}, document, {
              title: action.document.title,
              content: action.document.content
            });
          }
          return document;
        }) });
    case types.FETCH_DOCUMENT_SUCCESS:
      return Object.assign({}, state, { document: action.document });

    case types.CREATE_DOCUMENTS_SUCCESS:
      return Object.assign({}, state, action.document);

    case types.UNAUTHORIZED:
      return Object.assign({}, state, { error: 'Unauthorized' });
    default:
      return state;
  }
}
