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
