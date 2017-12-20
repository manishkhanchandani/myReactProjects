import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import AuthReducer from './components/auth/AuthReducer.js';
import QuizReducer from './components/quiz/QuizReducer.js';
import IssuesReducer from './components/essays/IssuesReducer.js';
import SimpleQuizReducer from './components/simple-quiz/SimpleQuizReducer.js';

const store = createStore(combineReducers({AuthReducer, QuizReducer, IssuesReducer, SimpleQuizReducer}), {}, applyMiddleware(createLogger(), thunk, promise()));

export default store;