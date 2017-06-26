import axios from 'axios';
import * as types from './actionTypes';

export function listDocs(documents) {
  return {
    type: types.LOAD_DOCUMENTS_SUCCESS,
    documents
  };
}
export function deleteDocs(id) {
  return {
    type: types.DELETE_DOCUMENTS_SUCCESS,
    id
  };
}
export function updateDocs(id) {
  return {
    type: types.UPDATE_DOCUMENTS_SUCCESS,
    id
  };
}
export function fetchDoc(doc) {
  return {
    type: types.FETCH_DOCUMENT_SUCCESS,
    doc
  };
}
export function create(doc) {
  return {
    type: types.CREATE_DOCUMENTS_SUCCESS,
    doc
  };
}


export function doclist(limit, offset) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.get(`/api/documents/?limit=${limit || 10}&offset=${offset || 0}`)
  .then((response) => {
    console.log('response', response);
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
  })
  .catch((error) => {
    dispatch({ type: 'Error' });
    throw error;
  });
}

export function updateDoc(doc) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.put(`/api/documents/${doc.id}`, doc)
  .then((response) => {
    dispatch(updateDocs(response.data));
  })
  .catch((error) => {
    dispatch({ type: 'Error' });
  });
}
export function findDoc(id) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.get(`/api/documents/${id}`)
  .then((response) => {
    dispatch(fetchDoc(response.data.doc));
  })
  .catch((error) => {
    dispatch({ type: 'Error' });
  });
}
export function createDoc(doc) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.post('/api/documents', doc)
  .then((response) => {
    dispatch(create(response.data));
  })
  .catch((error) => {
    dispatch({ type: 'Error' });
  });
}




