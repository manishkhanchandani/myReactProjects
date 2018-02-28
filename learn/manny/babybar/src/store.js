import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import AuthReducer from './components/auth/AuthReducer.js';
import QuizReducer from './components/quiz/QuizReducer.js';
import IssuesReducer from './components/essays/IssuesReducer.js';
import SimpleQuizReducer from './components/simple-quiz/SimpleQuizReducer.js';
import ChatReducer from './components/chat/ChatReducer.js';
import PractiseReducer from './components/practise/practiseReducer.js';

var store = null;
if (process.env.NODE_ENV === 'development') {
	store = createStore(combineReducers({AuthReducer, QuizReducer, IssuesReducer, SimpleQuizReducer, ChatReducer, PractiseReducer}), {}, applyMiddleware(createLogger(), thunk, promise()));
} else {
	store = createStore(combineReducers({AuthReducer, QuizReducer, IssuesReducer, SimpleQuizReducer, ChatReducer, PractiseReducer}), {}, applyMiddleware(thunk, promise()));	
}

export default store;