import axios from 'axios';
import * as types from './actionTypes';

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


export function signUp(user) {
  return dispatch => axios.post('/api/users/signup', user)
  .then((response) => {
    localStorage.setItem('token', response.data.token);
    dispatch(createUser(response.data.user));
    axios.defaults.headers.common.Authorization = token;
  })
  .catch((error) => {
    dispatch({ type: 'Error' });
  });
}

export function login(user) {
  return dispatch => axios.post('/api/users/login', user)
  .then((response) => {
    console.log('resonsessss', response);
    localStorage.setItem('token', response.data.token);
    dispatch(loginUser(response.data.userInfo));
    axios.defaults.headers.common.Authorization = token;
    dispatch({ type: 'Error' });
  })
  .catch((error) => {
    dispatch({ type: 'Error' });
  });
}

export function userlist() {
  return dispatch => axios.get('/api/users')
  .then((response) => {
    dispatch(listUsers(response.data));
    dispatch({ type: 'Error' });
  })
  .catch((error) => {
    dispatch({ type: 'Error' });
  });
}

