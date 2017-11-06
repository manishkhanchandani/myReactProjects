# myReactProjects

,
    "firebase": "^4.5.0",
    "react-google-autocomplete": "^1.0.13",
    "react-redux": "^5.0.6",
    "react-router-dom": "^4.2.2",
    "redux": "^3.7.2",
    "redux-logger": "^3.0.6",
    "redux-promise-middleware": "^4.4.1",
    "redux-thunk": "^2.2.0"
    
   npm install react-router-dom --save 
   npm install firebase --save 
   npm install redux --save 
   npm install react-redux --save 
   npm install redux-logger --save 
   npm install redux-promise-middleware --save 
   npm install redux-thunk --save 
   npm install react-google-autocomplete --save 
   
   npm install react-router-dom firebase redux react-redux redux-logger redux-promise-middleware redux-thunk --save 
   npm install react-google-autocomplete --save 

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



Redux


Install it or you have to write a code without understand - 

There are few steps which you have to understand

Steps 

Step 1: Npm Intall

npm install redux react-redux redux-logger redux-thunk redux-promise-middleware --save

Some Concepts

Variables - which I will use on all the components

Variables are save in a "state" - and this state is present in store part of the dredux

Store is saving the state (variables of our website)

props to use this state in any of the component

let's say i create a variable and i will save that variable as state and when i want to use that variable, i can use that as props.


dispatch (send)

	- it will dispatch or send the action to a function (reducers) -> save something or save variable in state and that state will go to store.


Step 2: store.js



dispatch -> Action -> Reducers -> Store (update) -> update all our components



index.js, we will use method 1 to dispatch

store.dispatch(loggedIn());

In components, dispatch is called in a different way,





Food Donation Create post


	
store.dispatch(blah());
FoodAction.js
	blah
	
FoodReducer.js
	dfdkfjdkfjd
	
variables are stored in store.js

and all components will get updated with the new variables.


ajax has some new learning things, which i explain you later.


sudo npm install -g firebase-tools

firebase login



firebase init

firebase deploy


Reducers
Actions

Components

	connect - React + Redux



Wednesday

Tomorrw thu
	fri
	
Next Week
	payment - refund it week
	
23rd - monday
24th - tuesday - 2 class - 9 pm


2 parts food donation

	donate the food
	
	receive the food










Promise [

	ajax - call,
		1 sec or 2 sec
		to return the data from server
		
		resolve(data);
		
		reject(data);

]



Firebase read helpers

orderByChild()	Order results by the value of a specified child key.
orderByKey()	Order results by child keys.
orderByValue()	Order results by child values.


eg.
var myUserId = firebase.auth().currentUser.uid;
var topUserPostsRef = firebase.database().ref('user-posts/' + myUserId).orderByChild('starCount');

limitToFirst()	Sets the maximum number of items to return from the beginning of the ordered list of results.
limitToLast()	Sets the maximum number of items to return from the end of the ordered list of results.
startAt()	Return items greater than or equal to the specified key or value, depending on the order-by method chosen.
endAt()	Return items less than or equal to the specified key or value, depending on the order-by method chosen.
equalTo()	Return items equal to the specified key or value, depending on the order-by method chosen.


Guides
Get Started
Analytics
DEVELOP
Cloud Messaging
Cloud Functions
Authentication
Realtime Database
Introduction
Choose a Database
iOS
Android
Web
Get Started
Structure Data
Read and Write Data
Work with Lists of Data
Enable Offline Capabilities
Admin
REST
C++
Unity
Security & Rules
Usage and Performance
Automated Backups
Extend with Cloud Functions
Cloud Firestore
Storage
Hosting
Test Lab
Performance Monitoring
Crash Reporting
GROW
Remote Config
App Indexing
Dynamic Links
Invites
AdWords
EARN
AdMob
Contents
Get a database reference
Reading and writing lists
Append to a list of data
Listen for child events
Listen for value events
Sorting and filtering data
Sort data
Filtering data
How query data is ordered
Detach listeners
Next steps
Work with Lists of Data on the Web

Get a database reference

To read or write data from the database, you need an instance of firebase.database.Reference:

// Get a reference to the database service
var database = firebase.database();
Note: By default, read and write access to your database is restricted so only authenticated users can read or write data. To get started without setting up Authentication, you can configure your rules for public access. This does make your database open to anyone, even people not using your app, so be sure to restrict your database again when you set up authentication.
Reading and writing lists

Append to a list of data

Use the push() method to append data to a list in multiuser applications. The push() method generates a unique key every time a new child is added to the specified Firebase reference. By using these auto-generated keys for each new element in the list, several clients can add children to the same location at the same time without write conflicts. The unique key generated by push() is based on a timestamp, so list items are automatically ordered chronologically.

You can use the reference to the new data returned by the push() method to get the value of the child's auto-generated key or set data for the child. The .key property of a push() reference contains the auto-generated key.

You can use these auto-generated keys to simplify flattening your data structure. For more information, see the data fan-out example.

For example, push() could be used to add a new post to a list of posts in a social application:

// Create a new post reference with an auto-generated id
var newPostRef = postListRef.push();
newPostRef.set({
    // ...
});
Listen for child events

Child events are triggered in response to specific operations that happen to the children of a node from an operation such as a new child added through the push() method or a child being updated through the update() method.

Event	Typical usage
child_added	Retrieve lists of items or listen for additions to a list of items. This event is triggered once for each existing child and then again every time a new child is added to the specified path. The listener is passed a snapshot containing the new child's data.
child_changed	Listen for changes to the items in a list. This event is triggered any time a child node is modified. This includes any modifications to descendants of the child node. The snapshot passed to the event listener contains the updated data for the child.
child_removed	Listen for items being removed from a list. This event is triggered when an immediate child is removed.The snapshot passed to the callback block contains the data for the removed child.
child_moved	Listen for changes to the order of items in an ordered list. child_moved events always follow the child_changed event that caused the item's order to change (based on your current order-by method).
Each of these together can be useful for listening to changes to a specific node in a database. For example, a social blogging app might use these methods together to monitor activity in the comments of a post, as shown below:

var commentsRef = firebase.database().ref('post-comments/' + postId);
commentsRef.on('child_added', function(data) {
  addCommentElement(postElement, data.key, data.val().text, data.val().author);
});

commentsRef.on('child_changed', function(data) {
  setCommentValues(postElement, data.key, data.val().text, data.val().author);
});

commentsRef.on('child_removed', function(data) {
  deleteComment(postElement, data.key);
});
Listen for value events

While listening for child events is the recommended way to read lists of data, there are situations listening for value events on a list reference is useful.

Attaching a value observer to a list of data will return the entire list of data as a single snapshot which you can then loop over to access individual children.

Even when there is only a single match for the query, the snapshot is still a list; it just contains a single item. To access the item, you need to loop over the result:

ref.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    // ...
  });
});
This pattern can be useful when you want to fetch all children of a list in a single operation, rather than listening for additional child added events.

Sorting and filtering data

You can use the Realtime Database Query class to retrieve data sorted by key, by value, or by value of a child. You can also filter the sorted result to a specific number of results or a range of keys or values.

Note: Filtering and sorting can be expensive, especially when done on the client. If your app uses queries, define the .indexOn rule to index those keys on the server and improve query performance as described in Indexing Your Data.
Sort data

To retrieve sorted data, start by specifying one of the order-by methods to determine how results are ordered:

Method	Usage
orderByChild()	Order results by the value of a specified child key.
orderByKey()	Order results by child keys.
orderByValue()	Order results by child values.
You can only use one order-by method at a time. Calling an order-by method multiple times in the same query throws an error.

The following example demonstrates how you could retrieve a list of a user's top posts sorted by their star count:

var myUserId = firebase.auth().currentUser.uid;
var topUserPostsRef = firebase.database().ref('user-posts/' + myUserId).orderByChild('starCount');
This defines a query that when combined with a child listener synchronizes the client with the user's posts from the path in the database based on their user ID, ordered by the number of stars each post has received. This technique of using IDs as index keys is called data fan out, you can read more about it in Structure Your Database.

The call to the orderByChild() method specifies the child key to order the results by. In this case, posts are sorted by the value of the "starCount" child in each post. For more information on how other data types are ordered, see How query data is ordered.

Filtering data

To filter data, you can combine any of the limit or range methods with an order-by method when constructing a query.

Method	Usage
limitToFirst()	Sets the maximum number of items to return from the beginning of the ordered list of results.
limitToLast()	Sets the maximum number of items to return from the end of the ordered list of results.
startAt()	Return items greater than or equal to the specified key or value, depending on the order-by method chosen.
endAt()	Return items less than or equal to the specified key or value, depending on the order-by method chosen.
equalTo()	Return items equal to the specified key or value, depending on the order-by method chosen.
Unlike the order-by methods, you can combine multiple limit or range functions. For example, you can combine the startAt() and endAt() methods to limit the results to a specified range of values.

Limit the number of results

You can use the limitToFirst() and limitToLast() methods to set a maximum number of children to be synced for a given event. 

e.g. var recentPostsRef = firebase.database().ref('posts').limitToLast(100);

Filter by key or value

You can use startAt(), endAt(), and equalTo() to choose arbitrary starting, ending, and equivalence points for queries. This can be useful for paginating data or finding items with children that have a specific value.

How query data is ordered

This section explains how data is sorted by each of the order-by methods in the Query class.

orderByChild

When using orderByChild(), data that contains the specified child key is ordered as follows:

Children with a null value for the specified child key come first.
Children with a value of false for the specified child key come next. If multiple children have a value of false, they are sorted lexicographically by key.
Children with a value of true for the specified child key come next. If multiple children have a value of true, they are sorted lexicographically by key.
Children with a numeric value come next, sorted in ascending order. If multiple children have the same numerical value for the specified child node, they are sorted by key.
Strings come after numbers and are sorted lexicographically in ascending order. If multiple children have the same value for the specified child node, they are ordered lexicographically by key.
Objects come last and are sorted lexicographically by key in ascending order.
orderByKey

When using orderByKey() to sort your data, data is returned in ascending order by key.

Children with a key that can be parsed as a 32-bit integer come first, sorted in ascending order.
Children with a string value as their key come next, sorted lexicographically in ascending order.
orderByValue

When using orderByValue(), children are ordered by their value. The ordering criteria are the same as in orderByChild(), except the value of the node is used instead of the value of a specified child key.


Detach listeners

Callbacks are removed by calling the off() method on your Firebase database reference.

You can remove a single listener by passing it as a parameter to off(). Calling off() on the location with no arguments removes all listeners at that location.

Calling off() on a parent listener does not automatically remove listeners registered on its child nodes; off() must also be called on any child listeners to remove the callback.

Structure Your Database
https://firebase.google.com/docs/database/web/structure-data

This guide covers some of the key concepts in data architecture and best practices for structuring the JSON data in your Firebase Realtime Database.

Building a properly structured database requires quite a bit of forethought. Most importantly, you need to plan for how data is going to be saved and later retrieved to make that process as easy as possible.

How data is structured: it's a JSON tree

All Firebase Realtime Database data is stored as JSON objects. You can think of the database as a cloud-hosted JSON tree. Unlike a SQL database, there are no tables or records. When you add data to the JSON tree, it becomes a node in the existing JSON structure with an associated key. You can provide your own keys, such as user IDs or semantic names, or they can be provided for you using push().

If you create your own keys, they must be UTF-8 encoded, can be a maximum of 768 bytes, and cannot contain ., $, #, [, ], /, or ASCII control characters 0-31 or 127.

For example, consider a chat application that allows users to store a basic profile and contact list. A typical user profile is located at a path, such as /users/$uid. The user alovelace might have a database entry that looks something like this:

{
  "users": {
    "alovelace": {
      "name": "Ada Lovelace",
      "contacts": { "ghopper": true },
    },
    "ghopper": { ... },
    "eclarke": { ... }
  }
}
Although the database uses a JSON tree, data stored in the database can be represented as certain native types that correspond to available JSON types to help you write more maintainable code.

Best practices for data structure

Avoid nesting data

Because the Firebase Realtime Database allows nesting data up to 32 levels deep, you might be tempted to think that this should be the default structure. However, when you fetch data at a location in your database, you also retrieve all of its child nodes. In addition, when you grant someone read or write access at a node in your database, you also grant them access to all data under that node. Therefore, in practice, it's best to keep your data structure as flat as possible.

For an example of why nested data is bad, consider the following multiply-nested structure:

{
  // This is a poorly nested data architecture, because iterating the children
  // of the "chats" node to get a list of conversation titles requires
  // potentially downloading hundreds of megabytes of messages
  "chats": {
    "one": {
      "title": "Historical Tech Pioneers",
      "messages": {
        "m1": { "sender": "ghopper", "message": "Relay malfunction found. Cause: moth." },
        "m2": { ... },
        // a very long list of messages
      }
    },
    "two": { ... }
  }
}
With this nested design, iterating through the data becomes problematic. For example, listing the titles of chat conversations requires the entire chats tree, including all members and messages, to be downloaded to the client.

Flatten data structures

If the data is instead split into separate paths, also called denormalization, it can be efficiently downloaded in separate calls, as it is needed. Consider this flattened structure:

{
  // Chats contains only meta info about each conversation
  // stored under the chats's unique ID
  "chats": {
    "one": {
      "title": "Historical Tech Pioneers",
      "lastMessage": "ghopper: Relay malfunction found. Cause: moth.",
      "timestamp": 1459361875666
    },
    "two": { ... },
    "three": { ... }
  },

  // Conversation members are easily accessible
  // and stored by chat conversation ID
  "members": {
    // we'll talk about indices like this below
    "one": {
      "ghopper": true,
      "alovelace": true,
      "eclarke": true
    },
    "two": { ... },
    "three": { ... }
  },

  // Messages are separate from data we may want to iterate quickly
  // but still easily paginated and queried, and organized by chat
  // conversation ID
  "messages": {
    "one": {
      "m1": {
        "name": "eclarke",
        "message": "The relay seems to be malfunctioning.",
        "timestamp": 1459361875337
      },
      "m2": { ... },
      "m3": { ... }
    },
    "two": { ... },
    "three": { ... }
  }
}
It's now possible to iterate through the list of rooms by downloading only a few bytes per conversation, quickly fetching metadata for listing or displaying rooms in a UI. Messages can be fetched separately and displayed as they arrive, allowing the UI to stay responsive and fast.

Create data that scales

When building apps, it's often better to download a subset of a list. This is particularly common if the list contains thousands of records. When this relationship is static and one-directional, you can simply nest the child objects under the parent.

Sometimes, this relationship is more dynamic, or it may be necessary to denormalize this data. Many times you can denormalize the data by using a query to retrieve a subset of the data, as discussed in Retrieve Data.

But even this may be insufficient. Consider, for example, a two-way relationship between users and groups. Users can belong to a group, and groups comprise a list of users. When it comes time to decide which groups a user belongs to, things get complicated.

What's needed is an elegant way to list the groups a user belongs to and fetch only data for those groups. An index of groups can help a great deal here:

// An index to track Ada's memberships
{
  "users": {
    "alovelace": {
      "name": "Ada Lovelace",
      // Index Ada's groups in her profile
      "groups": {
         // the value here doesn't matter, just that the key exists
         "techpioneers": true,
         "womentechmakers": true
      }
    },
    ...
  },
  "groups": {
    "techpioneers": {
      "name": "Historical Tech Pioneers",
      "members": {
        "alovelace": true,
        "ghopper": true,
        "eclarke": true
      }
    },
    ...
  }
}
You might notice that this duplicates some data by storing the relationship under both Ada's record and under the group. Now alovelace is indexed under a group, and techpioneers is listed in Ada's profile. So to delete Ada from the group, it has to be updated in two places.

This is a necessary redundancy for two-way relationships. It allows you to quickly and efficiently fetch Ada's memberships, even when the list of users or groups scales into the millions or when Realtime Database security rules prevent access to some of the records.

This approach, inverting the data by listing the IDs as keys and setting the value to true, makes checking for a key as simple as reading /users/$uid/groups/$group_id and checking if it is null. The index is faster and a good deal more efficient than querying or scanning the data.



Listen for child events

Child events are triggered in response to specific operations that happen to the children of a node from an operation such as a new child added through the push() method or a child being updated through the update() method.

Event	Typical usage
child_added	Retrieve lists of items or listen for additions to a list of items. This event is triggered once for each existing child and then again every time a new child is added to the specified path. The listener is passed a snapshot containing the new child's data.
child_changed	Listen for changes to the items in a list. This event is triggered any time a child node is modified. This includes any modifications to descendants of the child node. The snapshot passed to the event listener contains the updated data for the child.
child_removed	Listen for items being removed from a list. This event is triggered when an immediate child is removed.The snapshot passed to the callback block contains the data for the removed child.
child_moved	Listen for changes to the order of items in an ordered list. child_moved events always follow the child_changed event that caused the item's order to change (based on your current order-by method).
Each of these together can be useful for listening to changes to a specific node in a database. For example, a social blogging app might use these methods together to monitor activity in the comments of a post, as shown below:

var commentsRef = firebase.database().ref('post-comments/' + postId);
commentsRef.on('child_added', function(data) {
  addCommentElement(postElement, data.key, data.val().text, data.val().author);
});

commentsRef.on('child_changed', function(data) {
  setCommentValues(postElement, data.key, data.val().text, data.val().author);
});

commentsRef.on('child_removed', function(data) {
  deleteComment(postElement, data.key);
});
Listen for value events

While listening for child events is the recommended way to read lists of data, there are situations listening for value events on a list reference is useful.

Attaching a value observer to a list of data will return the entire list of data as a single snapshot which you can then loop over to access individual children.

Even when there is only a single match for the query, the snapshot is still a list; it just contains a single item. To access the item, you need to loop over the result:

ref.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    // ...
  });
});
This pattern can be useful when you want to fetch all children of a list in a single operation, rather than listening for additional child added events.



Text Field

	value=""
	
	onChange



Local Variable, local state variable
store the data on the page

first contractor
state variable



How to save in Firebase

	/data
	
		/posts
		
		Structure our data




/data
	/posts
		1: data
		2: data
		3: data
		4: data
		5: Pleasonton, data
		6. San jose, data
		7. Modesto, data
		8: Seattle, data
	
	
	/county
		/us
			/ca
			
				/Alameda County
					1. 26thoct2017
					5. 26thoct2017
					
				/Santa Clara County
					3: 26thoct2017
					6: 26thoct2017
					
				/San Francisco County
					4: 26thoct2017
					
				/Stanislaus County
					7: 26thoct2017
			/wa
				/King County
					8:  26thoct2017
					
					
					
	/city
		/us
			/ca
				/Alameda County
					/Dublin
						1. 26thoct2017
					/Pleasonton
						5: 26thoct2017
						
				/Santa Clara County
					/San jose
						6: 26thoct2017
			
				/Stanislaus County
					/Modesto
						7: 26thoct2017
			/wa
				/King County
					/Seattle
						8:  26thoct2017
					
						
					
	/state
		/us
			/ca
				1. 26thoct2017
				5: 26thoct2017
				6: 26thoct2017
				7: 26thoct2017
			/wa
				8:  26thoct2017
				
	/country
		/us
				1. 26thoct2017
				5: 26thoct2017
				6: 26thoct2017
				7: 26thoct2017
				8:  26thoct2017
			


tags: indian, indian food, food


	/indian
		/post
			1. 26thoct2017
			2. 26thoct2017
		/country
			/us
				1. 26thoct2017
				5: 26thoct2017
		/state
			/us
				/ca
					1. 26thoct2017
					5: 26thoct2017
				/wa
					8:  26thoct2017
		
	
	/indian food
		/country
			/us
				1. 26thoct2017
				5: 26thoct2017
		/state
			/us
				/ca
					1. 26thoct2017
					5: 26thoct2017
				/wa
					8:  26thoct2017
	
	
	/food
		/country
			/us
				1. 26thoct2017
				5: 26thoct2017
		/state
			/us
				/ca
					1. 26thoct2017
					5: 26thoct2017
				/wa
					8:  26thoct2017



data
	posts
		k: v
	county
	country
	city
	state
	users
	
	tags
		indian
			county
			country
			city
			state
			
			all_post
			
			
		food
			county
			country
			city
			state
			all_post
		
		test1
			county
			country
			city
			state
			all_post
		
		test2
			county
			country
			city
			state
			all_post



Purpose of Redux?
	Single page application:
		we go from one component to another, 1000 
		
		save all variables in store.js (Redux) - saving the state in store, so that we can use it anywhere in our code
		
		let say if i want to use variable only in one component and i don't want to pass to another component? - no redux
		

Redux
	Action
	Reducer
	
	Component and call both action and reducer
	Add reducer in store.js
	
Browse
	Action
		Promise and get data from api or firebase
		return type: 'Browse'
				payload: data from firebase

	Reducer
		case Browse_Fulfilled
			manipulate the state, data will be saved in state and this state will saved in the store, all my views will get updated
		




Home.js

	Page Loads
		Func1
			calls the firebase
			on value, i.e. whenever we have new value in database, we will get this function called.
			
			
			-> call action
				reducer with type and payload
				data will be updated with new values
				
				
				
Data with multiple rows,
1. ResultContainer
	ResultList
2. Convert the data into arrays from objects
	1a. Search, add the distance for each, ie.. how many miles each post is away from you

3. pass this foodReducer in ResultContainer so that we can loop through the result

https://reactabular.js.org/#/

npm install --save reactabular-column-extensions treetabular reactabular-dnd react-visibility-toggles reactabular-virtualized reactabular-sticky selectabular reactabular-table react-edit searchtabular sortabular reactabular-resizable



First Task is convert Object to Array


All data is present inside this.props.data

	for(i=0; i<10;i++)
	
	In react what we use
	
	
	var arr = array()
	arr[0] = 'one';
	arr[1] = 'two';
	
	arr.map((value, index) => {
		return <div>{value}</div>
	})
	
	
	{name: 'manny', age: 43}
	
arr.push({name: 'manny', age: 43});



Pagination - 1
npm install react-data-components --save
https://github.com/carlosrocha/react-data-components
http://carlosrocha.xyz/react-data-components/
https://react.rocks/example/react-data-components


template study
https://lbd-react.creative-tim.com/#/components#navbar-row