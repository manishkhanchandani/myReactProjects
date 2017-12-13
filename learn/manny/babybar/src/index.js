import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store.js';
import {FirebaseAuthSystem} from './components/auth/AuthAction.js';
import App from './App';

FirebaseAuthSystem(store.dispatch);

ReactDOM.render(<Provider store={store}>
		<BrowserRouter>
		<App />
	  </BrowserRouter>
	</Provider>, document.getElementById('root'));
registerServiceWorker();
