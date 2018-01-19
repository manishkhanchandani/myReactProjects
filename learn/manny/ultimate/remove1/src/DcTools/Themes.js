import React, {Component} from 'react';
import { loggedIn } from '../modules/auth/AuthAction';

class Themes extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			theme: null
		};
	}
	
	componentDidMount() {
		let theme = localStorage.getItem('theme');
		if (!theme) {
			theme = 'SpaceLab';	
		}
		this.fetchTheme(theme);
	}
	
	fetchTheme(theme) {
		localStorage.setItem('theme', theme);
		let url = '/themes/' + theme + '/bootstrap.min.css';
		console.log("url", url);
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
		if (this.props.loggedIn) {
			return (
			
				<li>
					<a href="" className="dropdown-toggle" data-toggle="dropdown">Theme <b className="caret"></b></a>
					<ul className="dropdown-menu">
						<li><a href="" onClick={this.getTheme.bind(this, 'Default')}>Default</a>
							<style>
								{this.state.theme}
							</style></li>
							<li><a href="" onClick={this.getTheme.bind(this, 'Cerulean')}>Cerulean</a></li>
							<li><a href="" onClick={this.getTheme.bind(this, 'Cosmo')}>Cosmo</a></li>
							<li><a href="" onClick={this.getTheme.bind(this, 'Cyborg')}>Cyborg</a></li>
							<li><a href="" onClick={this.getTheme.bind(this, 'Cyborg2')}>Cyborg2</a></li>
							<li><a href="" onClick={this.getTheme.bind(this, 'Darkly')}>Darkly</a></li>
							<li><a href="" onClick={this.getTheme.bind(this, 'Flatly')}>Flatly</a></li>
							<li><a href="" onClick={this.getTheme.bind(this, 'Journal')}>Journal</a></li>
							<li><a href="" onClick={this.getTheme.bind(this, 'Lumen')}>Lumen</a></li>
							<li><a href="" onClick={this.getTheme.bind(this, 'Paper')}>Paper</a></li>
							<li><a href="" onClick={this.getTheme.bind(this, 'Readable')}>Readable</a></li>
							<li><a href="" onClick={this.getTheme.bind(this, 'Sandstone')}>Sandstone</a></li>
							<li><a href="" onClick={this.getTheme.bind(this, 'Simplex')}>Simplex</a></li>
							<li><a href="" onClick={this.getTheme.bind(this, 'Slate')}>Slate</a></li>
							<li><a href="" onClick={this.getTheme.bind(this, 'Spacelab')}>Spacelab</a></li>
							<li><a href="" onClick={this.getTheme.bind(this, 'Superhero')}>Superhero</a></li>
							<li><a href="" onClick={this.getTheme.bind(this, 'United')}>United</a></li>
							<li><a href="" onClick={this.getTheme.bind(this, 'Yeti')}>Yeti</a></li>
					</ul>
				</li>
		)};
	}
}

export default Themes;