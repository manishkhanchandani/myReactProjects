/***  examples/src/index.js ***/
import React from 'react';
import { render} from 'react-dom';
import Themes from '../../src';
const App = () => (
    <Themes />
);
render(<App />, document.getElementById("root"));