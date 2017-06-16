import axios from 'axios';
import * as types from './actionTypes';

export function listDocs(docs) {
  return {
    type: types.LOAD_DOCUMENTS_SUCCESS,
    docs
  };
}
export function deleteDocs(id) {
  return {
    type: types.DELETE_DOCUMENTS_SUCCESS,
    id
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
export function deleteDoc(docId) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.delete(`api/documents/${docId}`)
  .then((response) => {
    dispatch(deleteDocs(docId));
    console.log('response', response);
  })
  .catch((error) => {
    console.log('error', error);
    dispatch({ type: 'Error' });
    throw error;
  });
}


