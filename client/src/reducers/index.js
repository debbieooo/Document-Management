import { combineReducers } from 'redux';
import users from './userReducer';
import authUser from './authReducer';

const rootReducer = combineReducers({
  users,
  authUser
});
console.log('user', users);
export default rootReducer;
