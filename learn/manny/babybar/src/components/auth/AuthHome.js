import React, {Component} from 'react';
import './AuthHome.css';

class AuthHome extends Component {
	render() {
		return (
			<div>
				<div className="container">
					<div className="container text-center">
						<form className="form-signin" data-ember-action="2">
							<h2 className="form-signin-heading">Sign in</h2>
				
							<small className="text-muted">Connect [your service] with your favorite social network</small>
							<br><br>
				
							
				<p>
				<a className="btn btn-primary social-login-btn social-facebook" href="/auth/facebook"><i className="fa fa-facebook"></i></a>
				<a className="btn btn-primary social-login-btn social-twitter" href="/auth/twitter"><i className="fa fa-twitter"></i></a>
				</p>
				<p>
				<a className="btn btn-primary social-login-btn social-linkedin" href="/auth/linkedin"><i className="fa fa-linkedin"></i></a>
				<a className="btn btn-primary social-login-btn social-google" href="/auth/google"><i className="fa fa-google-plus"></i></a>
				</p>
				
				<div className="btn-group social-login-more">
				  <button type="button" className="btn btn-default dropdown-toggle btn-block" data-toggle="dropdown">
					More...
				  </button>
				  <ul className="dropdown-menu text-left " role="menu">
					<li><a href="#"><i className="fa fa-tumblr-sign"></i>   Tumblr</a></li>
					<li><a href="#"><i className="fa fa-github-alt"></i>   Github</a></li>
					<li><a href="#"><i className="fa fa-dropbox"></i>   Dropbox</a></li>
					<li><a href="/auth/amazon"><span className="zocial-amazon"></span>   Amazon</a></li>
					<li><a href="#"><span className="zocial-bitbucket"></span>   Bitbucket</a></li>
					<li><a href="#"><span className="zocial-evernote"></span>   Evernote</a></li>
					<li><a href="#"><span className="zocial-meetup"></span>   Meetup</a></li>
					<li><a href="#"><i className="fa fa-windows"></i>   Windows Live</a></li>
					<li><a href="#"><i className="fa fa-weibo"></i>   Weibo</a></li>
					<li><a href="#"><i className="fa fa-foursquare"></i>   Foursquare</a></li>
					<li><a href="#"><i className="fa fa-stackexchange"></i>   Stack Exchange</a></li>
					<li><a href="#"><i className="fa fa-trello"></i>   Trello</a></li>
					<li><a href="#"><span className="zocial-wordpress"></span>   Wordpress</a></li>
				  </ul>
				</div>
				<br><br>
				
				
							<small className="text-muted">Or sign in with [your service]</small>
							<br><br>
							
							<input id="ember360" className="ember-view ember-text-field form-control login-input" placeholder="Email Address" type="text">
							<input id="ember361" className="ember-view ember-text-field form-control login-input-pass" placeholder="Password" type="password">
				
							<script id="metamorph-22-start" type="text/x-placeholder"></script><script id="metamorph-22-end" type="text/x-placeholder"></script>
				
							<button className="btn btn-lg btn-primary btn-block btn-center" type="submit" data-bindattr-3="3">Sign in</button>
							<br>
							<small className="create-account text-muted">Dont have a [your service] or social network account? <button id="ember363" className="ember-view btn btn-sm btn-default"> Sign Up </button> </small>
						</form>
					</div>
			</div>
		);
	}
}

export default AuthHome;