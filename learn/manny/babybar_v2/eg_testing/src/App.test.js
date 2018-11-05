import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('mangotest', () => {
	it('it should do blah blah blah', () => {
		const wrapper = shallow(<App />);
		console.log('hey');
		expect(wrapper.find(img)).toHaveLength(1);
	});
	/*
	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<App />, div);
	  ReactDOM.unmountComponentAtNode(div);
	});
	*/
		   
});