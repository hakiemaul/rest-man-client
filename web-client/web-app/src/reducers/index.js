import { combineReducers } from 'redux';

import menuReducer from './menuReducer';
import userReducer from './userReducer';
import transactionReducer from './transactionReducer';
import reportReducer from './reportReducer';


export default combineReducers({ menuReducer,userReducer,reportReducer,transactionReducer });
