const cowsay = require('../src/cowsay');

let cows = cowsay.list();
//remove this file from the cows list
cows.splice(cows.indexOf('random'), 1);
module.exports = cowsay.loadCow(cows[Math.floor(Math.random() * cows.length)]);
