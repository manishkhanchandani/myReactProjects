import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import MyReducer from './reducers/MyReducer.js';
import FoodDonationReducer from './reducers/FoodDonationReducer.js';
import ChatReducer from './modules/chat/ChatReducer.js';

var store = null;
if (process.env.NODE_ENV === 'development') {
	store = createStore(combineReducers({MyReducer, FoodDonationReducer, ChatReducer}), {}, applyMiddleware(createLogger(), thunk, promise()));
} else {
	store = createStore(combineReducers({MyReducer, FoodDonationReducer, ChatReducer}), {}, applyMiddleware(thunk, promise()));
}

export default store;