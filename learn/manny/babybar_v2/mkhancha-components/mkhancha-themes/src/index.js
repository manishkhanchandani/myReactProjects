/*** src/index.js   ***/
import React, {Component} from 'react';
import {NavDropdown, MenuItem} from 'react-bootstrap';

class Themes extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			theme: null,
			themeName: ''
		};
	}
	
	componentDidMount() {
		let theme = localStorage.getItem('theme');
		if (!theme) {
			theme = 'Default2';
		}
		this.fetchTheme(theme);
	}
	
	fetchTheme(theme) {
		localStorage.setItem('theme', theme);
		this.setState({themeName: theme});
		let url = '//r.mkgalaxy.com/themes/index.php?theme=' + theme;
		fetch(url, {
			method: 'GET'	  
		}).then((response) => { 
			return response.text(); 
		}).then((j) => {
			this.setState({theme: j});
		}).catch(() => {
			
		});	
	}

	getTheme(theme, e) {
		e.preventDefault();
		this.fetchTheme(theme);
		
	}

	render() {
		return (
				<NavDropdown eventKey={3} title={`Theme ${this.state.themeName}`} id="basic-nav-dropdown">
				  <MenuItem eventKey={3.1} onClick={this.getTheme.bind(this, 'Default')}>Default<style>
						{this.state.theme}
					</style></MenuItem>
				  <MenuItem eventKey={3.2} onClick={this.getTheme.bind(this, 'Default2')}>Default2</MenuItem>
				  <MenuItem eventKey={3.3} onClick={this.getTheme.bind(this, 'Cerulean')}>Cerulean</MenuItem>
				  <MenuItem eventKey={3.4} onClick={this.getTheme.bind(this, 'Cosmo')}>Cosmo</MenuItem>
				  <MenuItem eventKey={3.5} onClick={this.getTheme.bind(this, 'Cyborg')}>Cyborg</MenuItem>
				  <MenuItem eventKey={3.6} onClick={this.getTheme.bind(this, 'Darkly')}>Darkly</MenuItem>
				  <MenuItem eventKey={3.7} onClick={this.getTheme.bind(this, 'Flatly')}>Flatly</MenuItem>
				  <MenuItem eventKey={3.8} onClick={this.getTheme.bind(this, 'Journal')}>Journal</MenuItem>
				  <MenuItem eventKey={3.9} onClick={this.getTheme.bind(this, 'Lumen')}>Lumen</MenuItem>
				  <MenuItem eventKey={3.10} onClick={this.getTheme.bind(this, 'Paper')}>Paper</MenuItem>
				  <MenuItem eventKey={3.11} onClick={this.getTheme.bind(this, 'Readable')}>Readable</MenuItem>
				  <MenuItem eventKey={3.12} onClick={this.getTheme.bind(this, 'Sandstone')}>Sandstone</MenuItem>
				  <MenuItem eventKey={3.13} onClick={this.getTheme.bind(this, 'Slate')}>Slate</MenuItem>
				  <MenuItem eventKey={3.14} onClick={this.getTheme.bind(this, 'Spacelab')}>Spacelab</MenuItem>
				  <MenuItem eventKey={3.15} onClick={this.getTheme.bind(this, 'Superhero')}>Superhero</MenuItem>
				  <MenuItem eventKey={3.16} onClick={this.getTheme.bind(this, 'United')}>United</MenuItem>
				  <MenuItem eventKey={3.17} onClick={this.getTheme.bind(this, 'Yeti')}>Yeti</MenuItem>
				</NavDropdown>
		);
	}
}

export default Themes;