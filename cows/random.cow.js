const cowsay = require('../src/cowsay');
const cows = cowsay.list();

module.exports = cowsay.loadCow(cows[Math.floor(Math.random() * cows.length)]);

