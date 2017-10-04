import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import UserReducer from './reducers/UserReducer.js';

const store = createStore(combineReducers({UserReducer}), {}, applyMiddleware(createLogger(), thunk, promise()));

export default store;
