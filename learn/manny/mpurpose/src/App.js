import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
      <div className="mainmenu-wrapper">
	        <div className="container">
	        	<div className="menuextras">
					<div className="extras">
						<ul>
							<li className="shopping-cart-items"><i className="glyphicon glyphicon-shopping-cart icon-white"></i> <a href="page-shopping-cart.html"><b>3 items</b></a></li>
							<li>
								<div className="dropdown choose-country">
									<a className="#" data-toggle="dropdown" href="#"><img src="img/flags/gb.png" alt="Great Britain" /> UK</a>
									<ul className="dropdown-menu" role="menu">
										<li role="menuitem"><a href="#"><img src="img/flags/us.png" alt="United States" /> US</a></li>
										<li role="menuitem"><a href="#"><img src="img/flags/de.png" alt="Germany" /> DE</a></li>
										<li role="menuitem"><a href="#"><img src="img/flags/es.png" alt="Spain" /> ES</a></li>
									</ul>
								</div>
							</li>
			        		<li><a href="page-login.html">Login</a></li>
			        	</ul>
					</div>
		        </div>
		        <nav id="mainmenu" className="mainmenu">
					<ul>
						<li className="logo-wrapper"><a href="index.html"><img src="img/mPurpose-logo.png" alt="Multipurpose Twitter Bootstrap Template" /></a></li>
						<li className="active">
							<a href="index.html">Home</a>
						</li>
						<li>
							<a href="features.html">Features</a>
						</li>
						<li className="has-submenu">
							<a href="#">Pages +</a>
							<div className="mainmenu-submenu">
								<div className="mainmenu-submenu-inner"> 
									<div>
										<h4>Homepage</h4>
										<ul>
											<li><a href="index.html">Homepage (Sample 1)</a></li>
											<li><a href="page-homepage-sample.html">Homepage (Sample 2)</a></li>
										</ul>
										<h4>Services & Pricing</h4>
										<ul>
											<li><a href="page-services-1-column.html">Services/Features (Rows)</a></li>
											<li><a href="page-services-3-columns.html">Services/Features (3 Columns)</a></li>
											<li><a href="page-services-4-columns.html">Services/Features (4 Columns)</a></li>
											<li><a href="page-pricing.html">Pricing Table</a></li>
										</ul>
										<h4>Team & Open Vacancies</h4>
										<ul>
											<li><a href="page-team.html">Our Team</a></li>
											<li><a href="page-vacancies.html">Open Vacancies (List)</a></li>
											<li><a href="page-job-details.html">Open Vacancies (Job Details)</a></li>
										</ul>
									</div>
									<div>
										<h4>Our Work (Portfolio)</h4>
										<ul>
											<li><a href="page-portfolio-2-columns-1.html">Portfolio (2 Columns, Option 1)</a></li>
											<li><a href="page-portfolio-2-columns-2.html">Portfolio (2 Columns, Option 2)</a></li>
											<li><a href="page-portfolio-3-columns-1.html">Portfolio (3 Columns, Option 1)</a></li>
											<li><a href="page-portfolio-3-columns-2.html">Portfolio (3 Columns, Option 2)</a></li>
											<li><a href="page-portfolio-item.html">Portfolio Item (Project) Description</a></li>
										</ul>
										<h4>General Pages</h4>
										<ul>
											<li><a href="page-about-us.html">About Us</a></li>
											<li><a href="page-contact-us.html">Contact Us</a></li>
											<li><a href="page-faq.html">Frequently Asked Questions</a></li>
											<li><a href="page-testimonials-clients.html">Testimonials & Clients</a></li>
											<li><a href="page-events.html">Events</a></li>
											<li><a href="page-404.html">404 Page</a></li>
											<li><a href="page-sitemap.html">Sitemap</a></li>
											<li><a href="page-login.html">Login</a></li>
											<li><a href="page-register.html">Register</a></li>
											<li><a href="page-password-reset.html">Password Reset</a></li>
											<li><a href="page-terms-privacy.html">Terms & Privacy</a></li>
											<li><a href="page-coming-soon.html">Coming Soon</a></li>
										</ul>
									</div>
									<div>
										<h4>eShop</h4>
										<ul>
											<li><a href="page-products-3-columns.html">Products listing (3 Columns)</a></li>
											<li><a href="page-products-4-columns.html">Products listing (4 Columns)</a></li>
											<li><a href="page-products-slider.html">Products Slider</a></li>
											<li><a href="page-product-details.html">Product Details</a></li>
											<li><a href="page-shopping-cart.html">Shopping Cart</a></li>
										</ul>
										<h4>Blog</h4>
										<ul>
											<li><a href="page-blog-posts.html">Blog Posts (List)</a></li>
											<li><a href="page-blog-post-right-sidebar.html">Blog Single Post (Right Sidebar)</a></li>
											<li><a href="page-blog-post-left-sidebar.html">Blog Single Post (Left Sidebar)</a></li>
											<li><a href="page-news.html">Latest & Featured News</a></li>
										</ul>
									</div>
								</div>
							</div>
						</li>
						<li>
							<a href="credits.html">Credits</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>

        <div className="homepage-slider">
        	<div id="sequence">
				<ul className="sequence-canvas">
					<li className="bg4">
						<h2 className="title">Responsive</h2>
						<h3 className="subtitle">It looks great on desktops, laptops, tablets and smartphones</h3>
						<img className="slide-img" src="img/homepage-slider/slide1.png" alt="Slide 1" />
					</li>
					<li className="bg3">
						<h2 className="title">Color Schemes</h2>
						<h3 className="subtitle">Comes with 5 color schemes and its easy to make your own!</h3>
						<img className="slide-img" src="img/homepage-slider/slide2.png" alt="Slide 2" />
					</li>
					<li className="bg1">
						<h2 className="title">Feature Rich</h2>
						<h3 className="subtitle">Huge amount of components and over 30 sample pages!</h3>
						<img className="slide-img" src="img/homepage-slider/slide3.png" alt="Slide 3" />
					</li>
				</ul>
				<div className="sequence-pagination-wrapper">
					<ul className="sequence-pagination">
						<li>1</li>
						<li>2</li>
						<li>3</li>
					</ul>
				</div>
			</div>
        </div>

        <div className="section">
	    	<div className="container">
				<div className="row">
					<div className="col-md-4 col-sm-6">
						<div className="in-press press-wired">
							<a href="#">Morbi eleifend congue elit nec sagittis. Praesent aliquam lobortis tellus, nec consequat vitae</a>
						</div>
					</div>
					<div className="col-md-4 col-sm-6">
						<div className="in-press press-mashable">
							<a href="#">Morbi eleifend congue elit nec sagittis. Praesent aliquam lobortis tellus, nec consequat vitae</a>
						</div>
					</div>
					<div className="col-md-4 col-sm-6">
						<div className="in-press press-techcrunch">
							<a href="#">Morbi eleifend congue elit nec sagittis. Praesent aliquam lobortis tellus, nec consequat vitae</a>
						</div>
					</div>
				</div>
			</div>
		</div>

        <div className="section">
	        <div className="container">
	        	<div className="row">
	        		<div className="col-md-4 col-sm-6">
	        			<div className="service-wrapper">
		        			<img src="img/service-icon/diamond.png" alt="Service 1" />
		        			<h3>Aliquam in adipiscing</h3>
		        			<p>Praesent rhoncus mauris ac sollicitudin vehicula. Nam fringilla turpis turpis, at posuere turpis aliquet sit amet condimentum</p>
		        			<a href="#" className="btn">Read more</a>
		        		</div>
	        		</div>
	        		<div className="col-md-4 col-sm-6">
	        			<div className="service-wrapper">
		        			<img src="img/service-icon/ruler.png" alt="Service 2" />
		        			<h3>Curabitur mollis</h3>
		        			<p>Suspendisse eget libero mi. Fusce ligula orci, vulputate nec elit ultrices, ornare faucibus orci. Aenean lectus sapien, vehicula</p>
		        			<a href="#" className="btn">Read more</a>
		        		</div>
	        		</div>
	        		<div className="col-md-4 col-sm-6">
	        			<div className="service-wrapper">
		        			<img src="img/service-icon/box.png" alt="Service 3" />
		        			<h3>Vivamus mattis</h3>
		        			<p>Phasellus posuere et nisl ac commodo. Nulla facilisi. Sed tincidunt bibendum cursus. Aenean vulputate aliquam risus rutrum scelerisque</p>
		        			<a href="#" className="btn">Read more</a>
		        		</div>
	        		</div>
	        	</div>
	        </div>
	    </div>

	    <div className="section section-white">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="calltoaction-wrapper">
							<h3>Its a free multipurpose Bootstrap 3 template!</h3> <a href="http://www.dragdropsite.com" className="btn btn-orange">Download here!</a>
						</div>
					</div>
				</div>
			</div>
		</div>

	    <div className="section">
			<div className="container">
				<h2>Testimonials</h2>
				<div className="row">
					<div className="testimonial col-md-4 col-sm-6">
						<div className="author-photo">
							<img src="img/user1.jpg" alt="Author 1" />
						</div>
						<div className="testimonial-bubble">
							<blockquote>
								<p className="quote">
		                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut."
                        		</p>
                        		<cite className="author-info">
                        			- Name Surname,<br />Managing Director at <a href="#">Some Company</a>
                        		</cite>
                        	</blockquote>
                        	<div className="sprite arrow-speech-bubble"></div>
                        </div>
                    </div>
                    <div className="testimonial col-md-4 col-sm-6">
						<div className="author-photo">
							<img src="img/user5.jpg" alt="Author 2" />
						</div>
						<div className="testimonial-bubble">
							<blockquote>
								<p className="quote">
		                            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo."
                        		</p>
                        		<cite className="author-info">
                        			- Name Surname,<br />Managing Director at <a href="#">Some Company</a>
                        		</cite>
                        	</blockquote>
                        	<div className="sprite arrow-speech-bubble"></div>
                        </div>
                    </div>
					<div className="testimonial col-md-4 col-sm-6">
						<div className="author-photo">
							<img src="img/user2.jpg" alt="Author 3" />
						</div>
						<div className="testimonial-bubble">
							<blockquote>
								<p className="quote">
		                            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                        		</p>
                        		<cite className="author-info">
                        			- Name Surname,<br />Managing Director at <a href="#">Some Company</a>
                        		</cite>
                        	</blockquote>
                        	<div className="sprite arrow-speech-bubble"></div>
                        </div>
                    </div>
				</div>
			</div>
	    </div>

	    <div className="section">
	    	<div className="container">
	    		<h2>Pricing</h2>
	        	<div className="row">
	        		<div className="pricing-wrapper col-md-12">
						<div className="pricing-plan">
							<div className="ribbon-wrapper">
								<div className="price-ribbon ribbon-red">Popular</div>
							</div>
							<h2 className="pricing-plan-title">Starter</h2>
							<p className="pricing-plan-price">FREE</p>
							<ul className="pricing-plan-features">
								<li><strong>1</strong> user</li>
								<li><strong>Unlimited</strong> projects</li>
								<li><strong>2GB</strong> storage</li>
							</ul>
							<a href="index.html" className="btn">Order Now</a>
						</div>
					    <div className="pricing-plan">
							<h2 className="pricing-plan-title">Advanced</h2>
							<p className="pricing-plan-price">$49<span>/mo</span></p>
								<ul className="pricing-plan-features">
									<li><strong>10</strong> users</li>
									<li><strong>Unlimited</strong> projects</li>
									<li><strong>20GB</strong> storage</li>
								</ul>
							<a href="index.html" className="btn">Order Now</a>
					    </div>
					    <div className="pricing-plan pricing-plan-promote">
								<h2 className="pricing-plan-title">Premium</h2>
								<p className="pricing-plan-price">$99<span>/mo</span></p>
								<ul className="pricing-plan-features">
									<li><strong>Unlimited</strong> users</li>
									<li><strong>Unlimited</strong> projects</li>
									<li><strong>100GB</strong> storage</li>
								</ul>
							<a href="index.html" className="btn">Order Now</a>
					    </div>
					    <div className="pricing-plan">
							<div className="ribbon-wrapper">
								<div className="price-ribbon ribbon-green">New</div>
							</div>
							<h2 className="pricing-plan-title">Mega</h2>
							<p className="pricing-plan-price">$199<span>/mo</span></p>
								<ul className="pricing-plan-features">
									<li><strong>Unlimited</strong> users</li>
									<li><strong>Unlimited</strong> projects</li>
									<li><strong>100GB</strong> storage</li>
								</ul>
							<a href="index.html" className="btn">Order Now</a>
					    </div>
	        		</div>
	        	</div>
	    	</div>
	    </div>

	    <div className="section">
	    	<div className="container">
	    		<h2>Our Clients</h2>
				<div className="clients-logo-wrapper text-center row">
					<div className="col-lg-1 col-md-1 col-sm-3 col-xs-6"><a href="#"><img src="img/logos/canon.png" alt="Client Name" /></a></div>
					<div className="col-lg-1 col-md-1 col-sm-3 col-xs-6"><a href="#"><img src="img/logos/cisco.png" alt="Client Name" /></a></div>
					<div className="col-lg-1 col-md-1 col-sm-3 col-xs-6"><a href="#"><img src="img/logos/dell.png" alt="Client Name" /></a></div>
					<div className="col-lg-1 col-md-1 col-sm-3 col-xs-6"><a href="#"><img src="img/logos/ea.png" alt="Client Name" /></a></div>
					<div className="col-lg-1 col-md-1 col-sm-3 col-xs-6"><a href="#"><img src="img/logos/ebay.png" alt="Client Name" /></a></div>
					<div className="col-lg-1 col-md-1 col-sm-3 col-xs-6"><a href="#"><img src="img/logos/facebook.png" alt="Client Name" /></a></div>
					<div className="col-lg-1 col-md-1 col-sm-3 col-xs-6"><a href="#"><img src="img/logos/google.png" alt="Client Name" /></a></div>
					<div className="col-lg-1 col-md-1 col-sm-3 col-xs-6"><a href="#"><img src="img/logos/hp.png" alt="Client Name" /></a></div>
					<div className="col-lg-1 col-md-1 col-sm-3 col-xs-6"><a href="#"><img src="img/logos/microsoft.png" alt="Client Name" /></a></div>
					<div className="col-lg-1 col-md-1 col-sm-3 col-xs-6"><a href="#"><img src="img/logos/mysql.png" alt="Client Name" /></a></div>
					<div className="col-lg-1 col-md-1 col-sm-3 col-xs-6"><a href="#"><img src="img/logos/sony.png" alt="Client Name" /></a></div>
					<div className="col-lg-1 col-md-1 col-sm-3 col-xs-6"><a href="#"><img src="img/logos/yahoo.png" alt="Client Name" /></a></div>
				</div>
			</div>
	    </div>

	    <div className="footer">
	    	<div className="container">
		    	<div className="row">
		    		<div className="col-footer col-md-3 col-xs-6">
		    			<h3>Our Latest Work</h3>
		    			<div className="portfolio-item">
							<div className="portfolio-image">
								<a href="page-portfolio-item.html"><img src="img/portfolio6.jpg" alt="Project Name" /></a>
							</div>
						</div>
		    		</div>
		    		<div className="col-footer col-md-3 col-xs-6">
		    			<h3>Navigate</h3>
		    			<ul className="no-list-style footer-navigate-section">
		    				<li><a href="page-blog-posts.html">Blog</a></li>
		    				<li><a href="page-portfolio-3-columns-2.html">Portfolio</a></li>
		    				<li><a href="page-products-3-columns.html">eShop</a></li>
		    				<li><a href="page-services-3-columns.html">Services</a></li>
		    				<li><a href="page-pricing.html">Pricing</a></li>
		    				<li><a href="page-faq.html">FAQ</a></li>
		    			</ul>
		    		</div>
		    		
		    		<div className="col-footer col-md-4 col-xs-6">
		    			<h3>Contacts</h3>
		    			<p className="contact-us-details">
	        				<b>Address:</b> 123 Fake Street, LN1 2ST, London, United Kingdom<br/>
	        				<b>Phone:</b> +44 123 654321<br/>
	        				<b>Fax:</b> +44 123 654321<br/>
	        				<b>Email:</b> <a href="mailto:getintoutch@yourcompanydomain.com">getintoutch@yourcompanydomain.com</a>
	        			</p>
		    		</div>
		    		<div className="col-footer col-md-2 col-xs-6">
		    			<h3>Stay Connected</h3>
		    			<ul className="footer-stay-connected no-list-style">
		    				<li><a href="#" className="facebook"></a></li>
		    				<li><a href="#" className="twitter"></a></li>
		    				<li><a href="#" className="googleplus"></a></li>
		    			</ul>
		    		</div>
		    	</div>
		    	<div className="row">
		    		<div className="col-md-12">
		    			<div className="footer-copyright">&copy; 2013 mPurpose. All rights reserved.</div>
		    		</div>
		    	</div>
		    </div>
	    </div>
      </div>
    );
  }
}

export default App;
