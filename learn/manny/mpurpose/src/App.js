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

        <div className="section section-breadcrumbs">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1>PORTFOLIO - 2 COLUMNS (OPTION 1)</h1>
					</div>
				</div>
			</div>
		</div>
        
        <div className="section">
	    	<div className="container">
				<div className="row">
					<div className="col-sm-6">
						<div className="portfolio-item">
							<div className="portfolio-image">
								<a href="page-portfolio-item.html"><img src="img/portfolio1.jpg" alt="Project Name"></a>
							</div>
							<div className="portfolio-info-fade">
								<ul>
									<li className="portfolio-project-name">Project Name</li>
									<li>Website design & Development</li>
									<li>Client: Some Client LTD</li>
									<li className="read-more"><a href="page-portfolio-item.html" className="btn">Read more</a></li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="portfolio-item">
							<div className="portfolio-image">
								<a href="page-portfolio-item.html"><img src="img/portfolio2.jpg" alt="Project Name"></a>
							</div>
							<div className="portfolio-info-fade">
								<ul>
									<li className="portfolio-project-name">Project Name</li>
									<li>Website design & Development</li>
									<li>Client: Some Client LTD</li>
									<li className="read-more"><a href="page-portfolio-item.html" className="btn">Read more</a></li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="portfolio-item">
							<div className="portfolio-image">
								<a href="page-portfolio-item.html"><img src="img/portfolio3.jpg" alt="Project Name"></a>
							</div>
							<div className="portfolio-info-fade">
								<ul>
									<li className="portfolio-project-name">Project Name</li>
									<li>Website design & Development</li>
									<li>Client: Some Client LTD</li>
									<li className="read-more"><a href="page-portfolio-item.html" className="btn">Read more</a></li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="portfolio-item">
							<div className="portfolio-image">
								<a href="page-portfolio-item.html"><img src="img/portfolio4.jpg" alt="Project Name"></a>
							</div>
							<div className="portfolio-info-fade">
								<ul>
									<li className="portfolio-project-name">Project Name</li>
									<li>Website design & Development</li>
									<li>Client: Some Client LTD</li>
									<li className="read-more"><a href="page-portfolio-item.html" className="btn">Read more</a></li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="portfolio-item">
							<div className="portfolio-image">
								<a href="page-portfolio-item.html"><img src="img/portfolio5.jpg" alt="Project Name"></a>
							</div>
							<div className="portfolio-info-fade">
								<ul>
									<li className="portfolio-project-name">Project Name</li>
									<li>Website design & Development</li>
									<li>Client: Some Client LTD</li>
									<li className="read-more"><a href="page-portfolio-item.html" className="btn">Read more</a></li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="portfolio-item">
							<div className="portfolio-image">
								<a href="page-portfolio-item.html"><img src="img/portfolio6.jpg" alt="Project Name"></a>
							</div>
							<div className="portfolio-info-fade">
								<ul>
									<li className="portfolio-project-name">Project Name</li>
									<li>Website design & Development</li>
									<li>Client: Some Client LTD</li>
									<li className="read-more"><a href="page-portfolio-item.html" className="btn">Read more</a></li>
								</ul>
							</div>
						</div>
					</div>
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
