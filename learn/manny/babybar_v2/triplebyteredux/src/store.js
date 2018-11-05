import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
//import Reducer1 from './Reducer1.js';
//import Reducer2 from './Reducer2.js';

//let store = createStore(combineReducers({Reducer1, Reducer2}), {}, applyMiddleware(createLogger(), thunk, promise()));
//export default store;