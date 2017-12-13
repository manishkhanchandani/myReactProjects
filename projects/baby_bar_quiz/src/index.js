import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';

import store from './store.js';
import {FirebaseAuthSystem} from './modules/auth/AuthAction.js';
import Main from './Main.js';

import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';

FirebaseAuthSystem(store.dispatch);

ReactDOM.render((
    <Provider store={store}>
		<Main />
	</Provider>
),document.getElementById('root'));
registerServiceWorker();