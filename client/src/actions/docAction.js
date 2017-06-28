import axios from 'axios';
import * as types from './actionTypes';
import { searchSuccess } from './userAction';

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
export function fetchDoc(document) {
  return {
    type: types.FETCH_DOCUMENT_SUCCESS,
    document
  };
}
export function create(document) {
  return {
    type: types.CREATE_DOCUMENTS_SUCCESS,
    document
  };
}


export function doclist(limit, offset) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.get(`/api/documents/?limit=${limit || 10}&offset=${offset || 0}`)
  .then((response) => {
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

export function updateDoc(document) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.put(`/api/documents/${document.id}`, document)
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
    dispatch(fetchDoc(response.data.documents));
  })
  .catch((error) => {
    dispatch({ type: 'Error' });
  });
}
export function createDoc(document) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  console.log('document load', document);
  return dispatch => axios.post('/api/documents', document)
  .then((response) => {
    dispatch(create(response.data));
  })
  .catch((error) => {
    dispatch({ type: 'Error' });
  });
}

export function searchDoc(document) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.get(`/api/search/documents/?title=${document}`)
  .then((response) => {
    console.log(response);
    dispatch(searchSuccess(response.data.result.rows, response.data.metadata));
  })
  .catch((error) => {
    dispatch({ type: 'Error' });
  });
}
