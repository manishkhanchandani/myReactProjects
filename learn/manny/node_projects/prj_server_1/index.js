const express = require('express'); // we don't use import on node side, but on react side we use import statements, as node does not support that.
const app = express(); //listent to incoming request,

//route handler
app.get('/', (req, res) => {
	res.send({hi: 'there'});
});

const PORT = process.env.PORT || 5000; // we can use this variable in prod, but it will not be defined in local, so we add || 5000;
app.listen(PORT);

//http://localhost:5000/