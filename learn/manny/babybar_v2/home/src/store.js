import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import AuthReducer from './auth/AuthReducer.js';
import EssaysReducer from './Essays/Essays.Reducer.js';

var store = null;
if (process.env.NODE_ENV === 'development') {
	store = createStore(combineReducers({AuthReducer, EssaysReducer}), {}, applyMiddleware(createLogger(), thunk, promise()));
} else {
	store = createStore(combineReducers({AuthReducer, EssaysReducer}), {}, applyMiddleware(thunk, promise()));	
}

export default store;