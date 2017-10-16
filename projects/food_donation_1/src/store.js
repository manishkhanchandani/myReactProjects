import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import UserReducer from './reducers/UserReducer.js';
import FoodReducer from './reducers/FoodReducer.js';

const store = createStore(combineReducers({UserReducer, FoodReducer}), {}, applyMiddleware(createLogger(), thunk, promise()));

export default store;