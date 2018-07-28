var bookA = require('./book3.js');
var bookB = require('./book3.js')();

var bookA2 = bookA();

bookA2.rate(10);
bookB.rate(20);
console.log(bookA2.getPoints(), bookB.getPoints());

