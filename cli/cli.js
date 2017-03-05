const options = require('minimist')(process.argv.slice(2));
const getStdin = require('get-stdin');

function getOptions() {
    return new Promise((resolve) => {
        if (options.h) {
            options.text = `\
Usage: {cowsay | cowthink} [options] [message]Options:

-bdgpstwy modifiers
-h help (this text)
-e eyes
-f face
-l lists faces
-T Tongue
-W wrap`;
            resolve(options);
        } else if (options._.length > 0) {
            options.text = options._.join(' ');
            resolve(options);
        } else {
            getStdin().then(str => {
                //Remove trailing newline
                options.text = str.slice(0, str.lastIndexOf('\n') || str.length);
                resolve(options);
            });
        }
    });
}

module.exports = getOptions;
