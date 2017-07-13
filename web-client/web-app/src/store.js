import { applyMiddleware,createStore } from 'redux'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import rootReducers from './redurcers'

const middleware = applyMiddleware(promise(), thunk, logger)
const store = createStore(rootReducers,middleware)

export default store;
