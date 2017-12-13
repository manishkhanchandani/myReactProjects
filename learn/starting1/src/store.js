import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import AuthReducer from './components/auth/AuthReducer.js';

const store = createStore(combineReducers({AuthReducer}), {}, applyMiddleware(createLogger(), thunk, promise()));

export default store;