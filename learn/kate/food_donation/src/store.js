import {createStore, combineReducers, applyMiddleware} from 'redux';

import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
 
import MyReducer from './reducers/MyReducer.js';
import FoodDonationReducer from './reducers/FoodDonationReducer.js';
import ChatReducer from './modules/chat/ChatReducer.js';


const store = createStore(combineReducers({MyReducer, FoodDonationReducer, ChatReducer}), {}, applyMiddleware(createLogger(), thunk, promise()));

export default store; 