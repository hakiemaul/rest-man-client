import { combineReducers } from 'redux';

import menuReducer from './menuReducer';
import userReducer from './userReducer';

console.log('re-----------',menuReducer);
export default combineReducers({ menuReducer,userReducer });
