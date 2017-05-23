const cowsay = require('../cowsay');

let cows = cowsay.list();
//remove this file from the cows list
cows.splice(cows.indexOf('random'), 1);
module.exports = (thoughts = '\\', eyes = 'oo', tongue = '  ') => {
    return cowsay.loadCow(cows[Math.floor(Math.random() * cows.length)])(thoughts, eyes, tongue);
};
