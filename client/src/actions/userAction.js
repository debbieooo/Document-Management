import axios from 'axios';
import * as types from './actionTypes'

export function createUser(user) {
  return {
    type: types.CREATE_USER_SUCCESS,
    user
  }
}
export function loginUser(user) {
  return {
    type: types.LOGIN_USER_SUCCESS,
    user
  }
}
export function listUsers(users) {
  return {
    type: types.LOAD_USERS_SUCCESS,
    user
  }
}
export function signUp(user) {
  // console.log('usersssss', response.body.user);
  return dispatch =>axios.post('/api/users/signup', user)
  .then((response) => {
    localStorage.setItem('token', response.data.token);
    dispatch(createUser(response.data.userInfo));
    axios.defaults.headers.common.Authorization = token;
  })
  .catch((error) => {
    console.log(error);
    throw(error);
  });
}     