import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './store.js';
import {FirebaseAuthSystem} from './components/auth/AuthAction.js';
import App from './App';

FirebaseAuthSystem(store.dispatch);

ReactDOM.render(<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'));
registerServiceWorker();
