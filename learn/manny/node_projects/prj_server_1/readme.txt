project
node, express, mongo db, react, redux


Step 1:
Create a new project folder

Step 2:
Run npm init

Step 3:
Install Express

npm install --save express

Step 4:
Node
Javascript runtime used to execute code outside of the browser

Express
Library that runs in the node runtime. Has helpers to make dealing with HTTP traffic easier.

Explanation:
Incoming HTTP Request =>

Ports on your machine: 80 or 5000 or any	=>

Node	=> (we can build everything in node , but express makes life easier)

Express	=>

Route Handler 1 or Route Handler 2	=>

Response	=>

Node	=>

User will get the response.

Step 5
Create a new file in your project root, index.js

Write following in that file:

const express = require('express'); // we don't use import on node side, but on react side we use import statements, as node does not support that.
const app = express(); //listent to incoming request,

//route handler
app.get('/', (req, res) => {
	res.send({hi: 'there'});
});

app.listen(5000);

Now go to following url in browser
http://localhost:5000/


Some Explanation for above code:

app: Express App to register this route handler with

get: Watch for incoming requests with this method

'/': Watch for requests trying to access '/'.

req: Object representing the incoming request

res: Object representing the outgoing response

res.send({hi: 'there'): Immediately send some JSON back to who ever made this request.




app can have any of the following methods:

get: get info
post: send info
put: update all properties of something
delete: Delete something
patch: update one or two properties of something.


Step 6: How to deply (Deployment Checklist)

1. Dynamic Port Binding:
Heroku tells us which port our app will use, so we need to make sure we listen to the port they tell us to.

2. Specify Node Environment:
We want to use a specific version of node, so we need to tell Heroku which version we want.

3. Specify start script:
Instruct Heroku what command to run to start our server running.

4. Create .gitignore file:
We don't want to include dependencies, Heroku will do taht for us.

We will use third party service
https://www.heroku.com/

First Time Deploy
1. Create Heroku account
2. Commit our codebase to git
3. Install Heroku Cli and Create App
4. Deploy App with Git
5. Heroku deploys project

Subsequent Deploys
1. Commit codebase to git
2. Deplooy App with Git


1. Dynamic Port Binding:
Now before we deploy, change our code to add following before listen statement
const PORT = process.env.PORT || 5000; // we can use this variable in prod, but it will not be defined in local, so we add || 5000;

so it will be like
const PORT = process.env.PORT || 5000; // we can use this variable in prod, but it will not be defined in local, so we add || 5000;
app.listen(PORT);

2. Specify Node Environment:
Add following in package.json after "main": "index.js",

"main": "index.js",
"engines": {
	"node": "8.1.1",
	"npm": "5.0.3"
},

3. Specify start script:
Change the scripts part in package.json to:

"scripts": {
	"start": "node index.js"
},

4. Create .gitignore file:
and add following lines of code in it:

node_modules


Now do following
1. Create a new account in heroku

2. Commit your code in git

3. Install heroku cli and Create App

Search for following in google: heroku cli
And then go to following link
https://devcenter.heroku.com/articles/heroku-cli

and follow steps to install cli on your local machine.

After you are done with installation, run following command to check if heroku is installed

heroku -v


B. Create App

Type in command line:

heroku login

Now type following to create an app:

heroku create

Here we will see two links as:
Creating app... done, quiet-retreat-41673
https://quiet-retreat-41673.herokuapp.com/ | https://git.heroku.com/quiet-retreat-41673.git




  

