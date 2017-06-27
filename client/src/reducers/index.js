import { combineReducers } from 'redux';
import users from './userReducer';
import authUser from './authReducer';
import documents from './documentReducer';
import search from './searchReducer';

const rootReducer = combineReducers({
  users,
  authUser,
  documents,
  search

});
export default rootReducer;
