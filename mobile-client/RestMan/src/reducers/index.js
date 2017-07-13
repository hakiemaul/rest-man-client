import { combineReducers } from 'redux'

import userReducer from './userReducer'
import menuReducer from './menuReducer'
import orderReducer from './orderReducer'

export default combineReducers({
  user: userReducer,
  menu: menuReducer,
  order: orderReducer
})