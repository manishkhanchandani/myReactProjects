import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import AuthReducer from './modules/auth/AuthReducer.js';
import CategoryListReducer from './CategoryList/CategoryListReducer.js';
import MyFlixReducer from './MyFlix/MyFlixReducer.js';

var store = null;
if (process.env.NODE_ENV === 'development') {
	store = createStore(combineReducers({AuthReducer, CategoryListReducer, MyFlixReducer}), {}, applyMiddleware(createLogger(), thunk, promise()));
} else {
	store = createStore(combineReducers({AuthReducer, CategoryListReducer, MyFlixReducer}), {}, applyMiddleware(thunk, promise()));
}

export default store; 