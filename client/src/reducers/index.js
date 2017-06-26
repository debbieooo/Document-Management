import { combineReducers } from 'redux';
import users from './userReducer';
import authUser from './authReducer';
import documents from './documentReducer';

const rootReducer = combineReducers({
  users,
  authUser,
  documents

});
export default rootReducer;
