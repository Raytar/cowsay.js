const options = require('minimist')(process.argv.slice(2));
const getStdin = require('get-stdin');

if (options.h) {
    options.text = `\
Usage: {cowsay | cowthink} [options] [message]

Options:
-bdgpstwy modifiers
-h help (this text)
-e eyes
-f face
-l lists faces
-T Tongue
-W wrap`;
} else if (options._.length) {
    options.text = options._.join(' ');
} else {
    (() => {
        getStdin().then(str => {
            options.text = str;
        });
    })();
}

module.exports = options;
