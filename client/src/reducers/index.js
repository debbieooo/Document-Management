import { combineReducers } from 'redux';
import user from './userReducer';

const rootReducer = combineReducers({
  user
});
console.log('user', user);
export default rootReducer;
