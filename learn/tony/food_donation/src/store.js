import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import MyReducer from './reducers/MyReducer.js';
import FoodDonationReducer from './reducers/FoodDonationReducer.js';


const store = createStore(combineReducers({MyReducer, FoodDonationReducer}), {}, applyMiddleware(createLogger(), thunk, promise()));

export default store;