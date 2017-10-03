# myReactProjects


npm start
	to do all your development work


npm run build

	build folder will be created, 
	push this build to production
	
	
 cd helloworld
 npm start
 
 
 npm install
  this will bring back the node_modules
  
  
  
Task 1

1. I will grab the bootstrap css file from one location 
https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css


2. and i will save in css folder 
	public/css/bootstrap.css
	
3. and then i will link my index page with that css file
	public/index.html and <link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	
	
Task 2

	Small components 
	
1. Go to url: https://getbootstrap.com/docs/3.3/examples/starter-template/

2. Take navigation part and put it in A1.js
3. Take body part and put in A2.js

4. Call A1 and A2 both in App.js

5. Create A2.css

6. import './A2.css'; //this part has to be called in A2.js



Task 3

Props 

Pass the values to components

1. Create a component called as A11.js
2. And put following html code inside that:
<span className="label label-default">{this.props.name} - {this.props.age} / {this.props.gender}</span>

3. Import this component in App.js
4. Call this component multiple with different values as follows:
		<A11 name="Kate" age="22" gender="Female" />
		<A11 name="Carrie" age="23" gender="Female" />
		<A11 name="DJ" age="24" gender="Male" />
		<A11 name="Tony" age="25" gender="Male" />
		
		And run the app.

Looping, for looping,
varible from props,

City, state, country

var myStyle = {
         fontSize: 100,
         color: '#FF0000'
      }

<h1 style={myStyle}>Header</h1>




ROUTING IN REACT

1. npm install react-router-dom --save

2. We will define different routes in any component
import {BrowserRouter as Router, Route} from 'react-router-dom';

3. Wrap main div in app.js file with Router tag

<Router> <div> </div></Router>

4. Aim of Routing
	/about	About page
	/		Home page
	/contact	Contact page
	/page1		Home Component
	/page2 		Home Component
	
	Create all three components i.e. Home, About, Contact,
	
5. Import above 3 components in App.js
import Home from './project2/Home.js';
import About from './project2/About.js';
import Contact from './project2/Contact.js';

6. layout, it may have some header and some footer, i want to put some content inside this layout.


npm start will run the browser and we can see our application in browser


npm install is to install new utilities, new libraries


7. import {BrowserRouter as Router, Route, Link} from 'react-router-dom'; 
<Route exact={true} path="/" component={Home} />
<Route exact={true} path="/about" component={About} />
<Route exact={true} path="/contact" component={Contact} />
<p><Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/contact">Contact</Link></p>



List page
	all the listings
	
	detail page
	
Master Detail

	Master 
		listings of cars, of real estate property

100 project - this routing part


Best Way
	Git Pull
	Git Commit
	Git Push
	
Alternate Way
	Git Commit
	Git Pull
	Git Push
	
	
	https://github.com/brillout/awesome-react-components
	
	
Search Results

Keyword: 	indian food
Location:	San jose, ca, us
lat, lng, city, state, country, location, county

	/results/lat/lng/city/state/country/county/location/keyword
	
	/results/17.32/32/san+jose/ca/us/santa+clara/san+jose,+ca,+us/indian+food

food_donation
	along
	
Components
Routing
	
Phase 1
Firebase api, and react

1. Tutor Finder
2. Handyman Finder
3. Rental Homes
4. Buy/Sell Homes
5. Halloween Rentals
6. Remedy Finder
7. Freelance
8. Ecommerce, buy products
9. Car messaging service
10. Doctor Service
11. Lawyer Service


carrie
	1. Pet Adoption/Fostering
	2. Ecommerce

kate
	1. Rental Home
	2. Doctor Service
	
dj	
	1. Freelance
	2. Handyman Finder

tony
	1. Car Messaging Service
	2. Halloween Rentals
	
manmy
	1. Tutor Finder
	2. Remedy Finder
	
tamil
	1. Buy/Sell Homes
	2. Lawyer Service


food_donation

	Planning
	
		who have extra food, they will ad on the website, 
		
		post the ad,
			all the people near me can see that ad
			
		san jose, ca,
			
				kate mountain view 15 miles
				carrie sunnyvale	5 miles
				
		1. login page
		2. create post
		3. all my post
		4. edit any post
		5. delete any post
		6. search and result page
		7. message
		8. my account
				
git config credential.username 'Billy Everytee'


REDIRECTION

this.props.history.push("/contact"); // to redirect from javascript

or in render function, use
import {Redirect} from 'react-router-dom';
<Redirect to="/" push={true} />


		
React Bootstrap
npm install --save react-bootstrap

React Router Bootsrap
npm install -S react-router-bootstrap

Navigation with react Router
import {Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

<Nav bsStyle="tabs" activeKey="1">
  <LinkContainer to="/">
  <NavItem eventKey="1">NavItem 1 content</NavItem>
  </LinkContainer>
  <LinkContainer to="/about">
  <NavItem eventKey="2" title="Item">About</NavItem>
  </LinkContainer>
  <LinkContainer to="/contact">
  <NavItem eventKey="3" >Contact</NavItem>
  </LinkContainer>
  <NavDropdown eventKey="4" title="Dropdown" id="nav-dropdown">
    <LinkContainer to="/">
    <MenuItem eventKey="4.1">Action</MenuItem>
    </LinkContainer>
    <LinkContainer to="/about">
    <MenuItem eventKey="4.2">Another action</MenuItem>
    </LinkContainer>
    <LinkContainer to="/contact">
    <MenuItem eventKey="4.3">Something else here</MenuItem>
    </LinkContainer>
    <MenuItem divider />
    <MenuItem eventKey="4.4">Separated link</MenuItem>
  </NavDropdown>
</Nav>

or use
import NavBar from './nav/NavBar.js';
<NavBar />








Left Side			Right side

Seach Form			Results



Steps to do for autocomplete

Step 1: Install Autocomplete Module

npm install react-google-autocomplete --save

Step 2: We have to include google js file in our index.html

<script src="https://maps.googleapis.com/maps/api/js?key=&libraries=places"
        async defer></script>
		
Step 3: Go to component file and import following library

import Autocomplete from 'react-google-autocomplete';

<Autocomplete className="form-control" onPlaceSelected={(place) => {
								console.log(place);  
							}} types={['geocode']} />




//ARROW FUNCTION es6 version of javascript

function xyz() {
	console.log('hello world');
}

() => {
	console.log('hello world');
}

function xyz2(x1, x2) {
	console.log('x1 is ', x1, ' and x2 is ', x2);
}

(x1, x2) => {
	console.log('x1 is ', x1, ' and x2 is ', x2);
}




