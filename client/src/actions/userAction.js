import axios from 'axios';//eslint-disable-line
import * as types from './actionTypes';//eslint-disable-line

export function createUser(user) {
  return {
    type: types.CREATE_USER_SUCCESS,
    user
  };
}
export function loginUser(user) {
  return {
    type: types.LOGIN_USER_SUCCESS,
    user
  };
}
export function listUsers(users) {
  return {
    type: types.LOAD_USERS_SUCCESS,
    users
  };
}
export function deleteUsers(id) {
  return {
    type: types.DELETE_USER_SUCCESS,
    id
  };
}
export function getUser(user) {
  return {
    type: types.CURRENT_USER_INFO,
    user
  };
}
export function updateUser(user) {
  console.log(user);
  return {
    type: types.UPDATE_USER_SUCCESS,
    user
  };
}
export function searchSuccess(search, metadata) {

  return {
    type: types.SEARCH_SUCCESS,
    search,
    metadata
  };
}



export function signUp(user) {
  return dispatch => axios.post('/api/users/signup', user)
  .then((response) => {
    window.localStorage.setItem('token', response.data.token);
    window.localStorage.setItem('userInfo', response.data.user);
    dispatch(createUser(response.data.user));
    return response.data.token;
  })
  .catch((error) => {
    dispatch({ type: 'Error', error: error.response.data });
  });
}

export function login(user) {
  return dispatch => axios.post('/api/users/login', user)
  .then((response) => {
    window.localStorage.setItem('token', response.data.token);
    window.localStorage.setItem('userInfo', response.data.userInfo);
    dispatch(loginUser(response.data.userInfo));
    return response.data.token;
  })
  .catch((error) => {
    dispatch({ type: 'Error', error: error.response.data });
  });
}

export function deleteAcc(userId) {
  const token = window.localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.delete(`api/users/${userId}`)
  .then(() => {
    dispatch(deleteUsers(userId));
  })
  .catch((error) => {
    dispatch({ type: 'Error', error: error.response.data });
  });
}


export function userlist(limit, offset) {
  const token = window.localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.get(`/api/users/?limit=${limit || 10}&offset=${offset || 0}`)
  .then((response) => {
    dispatch(listUsers(response.data));
    dispatch({ type: 'Error' });
  })
  .catch((error) => {
    dispatch({ type: 'Error', error: error.response.data });
  });
}

export function activeUser() {
  const token = window.localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.get('/api/users/active')
  .then((response) => {
    dispatch(getUser(response.data));
  })
  .catch((error) => {
    dispatch({ type: 'Error', error: error.response.data });
  });
}

export function sendUserUpdate(user) {
  const token = window.localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.put(`/api/users/${user.id}`, user)
  .then((response) => {
    dispatch(updateUser(response.data));
  })
  .catch((error) => {
    console.log(error);
    dispatch({ type: 'Error', error: error.response.data });
  });
}

export function searchUser(user) {
  const token = window.localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  return dispatch => axios.get(`/api/search/users/?q=${user}`)
  .then((response) => {
    dispatch(searchSuccess(response.data.user, response.data.metadata));
  })
  .catch((error) => {
    dispatch({ type: 'Error', error: error.response.data });
  });
}
