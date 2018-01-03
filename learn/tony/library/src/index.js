import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './store.js';
import {FirebaseAuthSystem} from './modules/auth/AuthAction.js';

FirebaseAuthSystem(store.dispatch);

ReactDOM.render(
				<Provider store={store}>
				<App />
				</Provider>
				, document.getElementById('root'));
registerServiceWorker();
