#!/usr/bin/env node
const getOptions = require('./cli.js');
const cow = require('../cowsay.js');

getOptions().then(options => {
    console.log(cow.think(options));
}).catch(err => {
    console.log(err.message);
});
