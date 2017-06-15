import axios from 'axios';
import * as types from './actionTypes';

export function listDocs(docs) {
  return {
    type: types.LOAD_DOCUMENTS_SUCCESS,
    docs
  };
}

export function doclist() {
  return dispatch => axios.get('/api/documents')
  .then((response) => {
    console.log('response.data', response.data);
    dispatch(listDocs(response.data));
    dispatch({ type: 'Error' });
  })
  .catch((error) => {
    dispatch({ type: Error });
  });
}
