import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {Provider} from 'react-redux';
import store from './store.js';

//import registerServiceWorker from './registerServiceWorker';
import {FirebaseAuthSystem} from './modules/auth/AuthAction.js';

FirebaseAuthSystem(store.dispatch);



ReactDOM.render(
				
				<Provider store = {store}>
				<App />
				</Provider>    
				, document.getElementById('root'));
//registerServiceWorker();