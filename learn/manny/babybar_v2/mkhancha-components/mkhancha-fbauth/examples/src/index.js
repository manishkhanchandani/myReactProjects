/***  examples/src/index.js ***/
import React from 'react';
import { render} from 'react-dom';
import AuthHome from '../../src';
const App = () => (
    <AuthHome />
);
render(<App />, document.getElementById("root"));