import { combineReducers } from 'redux';
import users from './userReducer';
import authUser from './authReducer';
import docs from './docReducer';

const rootReducer = combineReducers({
  users,
  authUser,
  docs

});
export default rootReducer;
