import axios from 'axios';
import * as types from './actionTypes';
import { searchSuccess } from './userAction';
/**
 * 
 * @export 
 * @param {any} documents
 * @returns {object} dispatch
 */
export function listDocs(documents) {
  return {
    type: types.LOAD_DOCUMENTS_SUCCESS,
    documents
  };
}
/**
 *
 *
 * @export
 * @param {any} id
 * @returns {object} dispatch
 */
export function deleteDocs(id) {
  return {
    type: types.DELETE_DOCUMENTS_SUCCESS,
    id
  };
}
/**
 *
 *
 * @export
 * @param {any} document
 * @returns {object} dispatch
 */
export function updateDocs(document) {
  return {
    type: types.UPDATE_DOCUMENTS_SUCCESS,
    document
  };
}
/**
 *
 *
 * @export
 * @param {any} document
 * @returns {object} dispatch
 */
export function fetchDoc(document) {
  return {
    type: types.FETCH_DOCUMENT_SUCCESS,
    document
  };
}
/**
 *
 *
 * @export
 * @param {any} document
 * @returns {object} dispatch
 */
export function create(document) {
  return {
    type: types.CREATE_DOCUMENTS_SUCCESS,
    document
  };
}
/**
 *
 *
 * @export
 * @param {any} limit
 * @param {any} offset
 * @returns {object} dispatch
 */
export function doclist(limit, offset) {
  const token = window.localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch =>
    axios.get(`/api/v1/documents/?limit=${limit || 10}
  &offset=${offset || 0}`)
      .then((response) => {
        dispatch(listDocs(response.data));
        // dispatch({ type: 'Error' });
      })
      .catch((error) => {
        dispatch({ type: 'Error', error: error.response.data });
      });
}
/**
 *
 *
 * @export
 * @param {any} docId
 * @returns {object} dispatch
 */
export function deleteDoc(docId) {
  const token = window.localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.delete(`api/v1/documents/${docId}`)
  .then((response) => {//eslint-disable-line
      dispatch(deleteDocs(docId));
    })
    .catch((error) => {
      dispatch({ type: 'Error', error: error.response.data });
    });
}
/**
 *
 *
 * @export
 * @param {any} document
 * @returns {object} dispatch
 */
export function updateDoc(document) {
  const token = window.localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.put(`/api/v1/documents/${document.id}`, document)
    .then((response) => {
      dispatch(updateDocs(response.data));
    })
    .catch((error) => {
      dispatch({ type: 'Error', error: error.response.data });
    });
}
/**
 *
 *
 * @export
 * @param {any} id
 * @returns {object} dispatch
 */
export function findDoc(id) {
  const token = window.localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.get(`/api/v1/documents/${id}`)
    .then((response) => {
      dispatch(fetchDoc(response.data.documents));
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch({ type: types.UNAUTHORIZED, error: error.response.data });
      } else {
        dispatch({ type: 'Error', error: error.response.data });
      }
    });
}
/**
 *
 *
 * @export
 * @param {any} document
 * @returns {object} dispatch
 */
export function createDoc(document) {
  const token = window.localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.post('/api/v1/documents', document)
    .then((response) => {
      dispatch(create(response.data));
    })
    .catch((error) => {
      dispatch({ type: 'Error', error: error.response.data });
    });
}
/**
 *
 *
 * @export
 * @param {any} document
 * @returns {object} dispatch
 */
export function searchDoc(document) {
  const token = window.localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.get(`/api/v1/search/documents/?title=${document}`)
    .then((response) => {
      dispatch(searchSuccess(response.data.result.rows, response.data.metadata));
    })
    .catch((error) => {
      dispatch({ type: 'Error', error: error.response.data });
    });
}
