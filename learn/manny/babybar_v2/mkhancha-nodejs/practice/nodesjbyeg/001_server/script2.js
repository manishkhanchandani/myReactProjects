var bookA = require('./book2.js');
var bookB = require('./book2.js');

bookA.rate(10);
bookB.rate(20);
console.log(bookA.getPoints(), bookB.getPoints());

