import axios from 'axios';
import * as types from './actionTypes';

/**
 * @export
 * @param {any} user
 * @returns {object} dispatch
 */
export function createUser(user) {
  return {
    type: types.CREATE_USER_SUCCESS,
    user
  };
}
/**
 *
 *
 * @export
 * @param {any} user
 * @returns {object} dispatch
 */
export function loginUser(user) {
  return {
    type: types.LOGIN_USER_SUCCESS,
    user
  };
}
/**
 * @export
 * @param {any} users
 * @returns {object} dispatch
 */
export function listUsers(users) {
  return {
    type: types.LOAD_USERS_SUCCESS,
    users
  };
}
/**
 *
 *
 * @export
 * @param {any} id
 * @returns {object} dispatch
 */
export function deleteUsers(id) {
  return {
    type: types.DELETE_USER_SUCCESS,
    id
  };
}
/**
 *
 *
 * @export
 * @param {any} user
 * @returns {object} dispatch
 */
export function getUser(user) {
  return {
    type: types.CURRENT_USER_INFO,
    user
  };
}
/**
 *
 *
 * @export
 * @param {any} user
 * @returns {object} dispatch
 */
export function updateUser(user) {
  return {
    type: types.UPDATE_USER_SUCCESS,
    user
  };
}
/**
 *
 *
 * @export
 * @param {any} search
 * @param {any} metadata
 * @returns {object} dispatch
 */
export function searchSuccess(search, metadata) {
  return {
    type: types.SEARCH_SUCCESS,
    search,
    metadata
  };
}
/**
 *
 *
 * @export
 * @param {any} user
 * @returns {object} dispatch
 */
export function signUp(user) {
  return dispatch => axios.post('/api/v1/users/signup', user)
    .then((response) => {
      window.localStorage.setItem('token', response.data.token);
      dispatch(createUser(response.data.user));
      // return response.data.token;
    })
    .catch((error) => {
      dispatch({
        type: types.LOGIN_USER_FAILED,
        error: error.response.data
      });
    });
}

/**
 *
 *
 * @export
 * @param {any} user
 * @returns {object} dispatch
 */
export function login(user) {
  return dispatch => axios.post('/api/v1/users/login', user)
    .then((response) => {
      window.localStorage.setItem('token', response.data.token);
      dispatch(loginUser(response.data.userInfo));
      return response.data.token;
    })
    .catch((error) => {
      dispatch({
        type: types.SIGNUP_USER_FAILED,
        error: error.response.data
      });
    });
}
/**
 * 
 * 
 * @export
 * @returns {object} dispatch
 */
export function logout() {
  return { type: types.LOGOUT_SUCCESSFUL };
}
/**
 *
 *
 * @export
 * @param {any} userId
 * @returns {object} dispatch
 */
export function deleteAcc(userId) {
  const token = window.localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.delete(`api/v1/users/${userId}`)
    .then(() => {
      dispatch(deleteUsers(userId));
    })
    .catch((error) => {
      dispatch({ type: 'Error', error: error.response.data });
    });
}
/**
 *
 *
 * @export
 * @param {any} limit
 * @param {any} offset
 * @returns {object} dispatch
 */
export function userlist(limit, offset) {
  const token = window.localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios
    .get(`/api/v1/users/?limit=${limit || 10}&offset=${offset || 0}`)
    .then((response) => {
      dispatch(listUsers(response.data));
      dispatch({ type: 'Error' });
    })
    .catch((error) => {
      dispatch({ type: 'Error', error: error.response.data });
    });
}
/**
 *
 *
 * @export
 * @returns {object} dispatch
 */
export function activeUser() {
  const token = window.localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.get('/api/v1/users/active')
    .then((response) => {
      dispatch(getUser(response.data));
    })
    .catch((error) => {
      dispatch({ type: 'Error', error: error.response.data });
    });
}
/**
 *
 *
 * @export
 * @param {any} user
 * @returns {object} dispatch
 */
export function sendUserUpdate(user) {
  const token = window.localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.put(`/api/v1/users/${user.id}`, user)
    .then((response) => {
      dispatch(updateUser(response.data));
    })
    .catch((error) => {
      dispatch({ type: 'Error', error: error.response.data });
    });
}
/**
 *
 *
 * @export
 * @param {any} user
 * @returns {object} dispatch
 */
export function searchUser(user) {
  const token = window.localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.get(`/api/v1/search/users/?q=${user}`)
    .then((response) => {
      dispatch(searchSuccess(response.data.user, response.data.metadata));
    })
    .catch((error) => {
      dispatch({ type: 'Error', error: error.response.data });
    });
}
