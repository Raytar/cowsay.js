#!/usr/bin/env node
const options = require('./cli.js');
const cow = require('../src/cowsay.js');

console.log(cow.say(options));
