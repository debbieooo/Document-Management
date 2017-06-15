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
export function deleteUsers(id) {
  return {
    type: types.DELETE_USER_SUCCESS,
    id
  };
}
export function currentUserInfo(user) {
  return {
    type: types.CURRENT_USER_INFO,
    user
  };
}


export function signUp(user) {
  return dispatch => axios.post('/api/users/signup', user)
  .then((response) => {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userInfo', response.data.user);
    dispatch(createUser(response.data.user));
    // axios.defaults.headers.common.Authorization = token;
    return response.data.token;
  })
  .catch((error) => {
    dispatch({ type: 'Error' });
    throw error;
  });
}

export function login(user) {
  return dispatch => axios.post('/api/users/login', user)
  .then((response) => {
    // console.log('resonsessss', response);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userInfo', response.data.userInfo);
    dispatch(loginUser(response.data.userInfo));
    return response.data.token;
  })
  .catch((error) => {
    dispatch({ type: 'Error' });
    throw error;
  });
}

export function deleteAcc(userId) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;
  console.log('im about to delete');
  return dispatch => axios.delete(`api/users/${userId}`)
  .then((response) => {
    dispatch(deleteUsers(userId));
  })
  .catch((error) => {
    dispatch({ type: 'Error' });
    throw error;
  });
}


export function userlist() {
  return dispatch => axios.get('/api/users')
  .then((response) => {
    console.log('response.data', response.data);
    dispatch(listUsers(response.data));
    dispatch({ type: 'Error' });
  })
  .catch((error) => {
    dispatch({ type: 'Error' });
  });
}

// export function currentUser(userId) {
//   return dispatch => axios.get(`api/users/${userId}`)
//   .then((response) => {
//     dispatch(currentUserInfo(userId));
//   })
//   .catch((error) => {
//     dispatch({ type: 'Error' });
//     throw error;
//   });
// }

