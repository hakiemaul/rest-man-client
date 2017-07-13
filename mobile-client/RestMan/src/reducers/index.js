import { combineReducers } from 'redux'

import userReducer from './userReducer'
import menuReducer from './menuReducer'
import orderReducer from './orderReducer'
import tableReducer from './tableReducer'

export default combineReducers({
  user: userReducer,
  menu: menuReducer,
  order: orderReducer,
  table: tableReducer
})