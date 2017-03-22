const fs = require('fs');
const path = require('path');
const wordwrap = require('wordwrap');

/**
 * @typedef {Object} CowsayOptions
 * @property {string} text
 * @property {string} e The eyes
 * @property {string} T The tongue
 * @property {boolean} l If a list of cowfiles should be returned
 * @property {boolean} b Use borg face
 * @property {boolean} d Use dead face
 * @property {boolean} g Use greedy face
 * @property {boolean} p Use paranoid face
 * @property {boolean} s Use stoned face
 * @property {boolean} t Use tired face
 * @property {boolean} w Use wired face
 * @property {boolean} y Use young face
 *
 */

/** @var {string} customPath - Path to external cowfiles */
let customPath;

exports.customPath = customPath;

exports.say = (options) => {
    return cowsay(options, false);
};
exports.think = (options) => {
    return cowsay(options, true);
};
exports.list = list;
exports.loadCow = loadCow;

/**
 * Get the cow with options
 * @param {CowsayOptions} options
 * @return {string}
 */
function cowsay(options, cowthink) {
    let file = options.f || 'default';
    let cow = loadCow(file, customPath) || loadCow(file);

    if (customPath) {
        try {
            cow = loadCow(file, customPath);
        } catch (e) {
            if (e instanceof TypeError) return e.message;
            cow = null;
        }
    }

    if (!cow) {
        try {
            cow = loadCow(file);
        } catch (e) {
            return e.message;
        }
    }

    options = setFace(options);

    if (options.l) {
        let files = list();
        options.text = 'Available cows:\n\n' + files.join(' ');
    }


    let output = '';
    let thoughtsChar = cowthink ? 'o' : '\\';

    if (!options.text) {
        thoughtsChar = ' ';
    }

    try {
        output += cow(thoughtsChar, options.e, options.T);
    } catch (e) {
        return `Problem with cowfile '${file}': ${e.message}`;
    }

    //Determine the position of the bubble-connector thingy
    let reg = new RegExp(`^.*?${thoughtsChar}.*?$`, 'm');
    let match = reg.exec(output);
    let offset = match ? match[0].indexOf(thoughtsChar) : 0;

    //add the bubble if there is text
    if (options.text) {
        output = bubble(options.text, options.W, cowthink, offset) + output;
    }

    return output;
}

/**
 * Load a cowfile
 * @param {string} name name of the cowfile
 * @param {folder} folder the folder where the cowfile is located
 * @returns {function} a function that generates the cow.
 */
function loadCow(name, folder = path.join(__dirname, 'cows/')) {
    let cow;

    try {
        cow = require(path.join(folder, name) + '.cow.js');
    } catch (e) {
        throw new Error(`Could not load cowfile '${name}': ${e.message}`);
    }

    if (typeof cow !== 'function') {
        throw new TypeError(`Problem with cowfile '${name}'.`);
    }

    return cow;
}

/**
 * Set the face of the cow
 * @param {CowsayOptions} options the options for the cow
 * @returns {CowsayOptions} modified options with the correct face
 */
function setFace(options) {
    const faces = {
        b: { e: '==' },
        d: { e: 'xx', T: 'U ' },
        g: { e: '$$' },
        p: { p: '@@' },
        s: { e: '**', T: 'U ' },
        t: { e: '--' },
        w: { e: 'OO' },
        y: { e: '..' },
    };

    if (!(options.e || options.T)) {
        for (let face in faces) {
            if (options[face] === true) {
                options.e = faces[face].e;
                options.T = faces[face].T;
            }
        }
    }

    return options;
}

/**
 * @returns {string[]} a list of available cows, including cows in customPath
 */
function list() {
    let files;

    try {
        files = fs.readdirSync(path.join(__dirname, 'cows/'));
        if (customPath) files.concat(fs.readdirSync(customPath));
    } catch (e) {
        throw new Error('Failed to list cows: ' + e.message);
    }

    //Filter out duplicates
    files = [...new Set(files)];

    files.forEach((file, index, files) => {
        files[index] = path.basename(file, '.cow.js');
    });

    return files;
}

/**
 * Create the bubble
 * @param {string} text The text to put in the bubble
 * @param {number} wrap The column to wrap the text const. Default 80
 * @param {boolean} cowthink Decides if a speech bubble or a thought bubble
 * should be created.
 * @param {number} offset The column where the bubble will connects with the cow
 * @returns {string}
 */
function bubble(text, wrap = 80, cowthink = false, offset = 0) {
    let walls;

    if (cowthink) {
        walls = {
            top: '_',
            bottom: '-',
            left: '(',
            right: ')',
        };
    } else {
        walls = {
            top: '_',
            bottom: '-',
            left: '<',
            right: '>',
            topLeftCorner: '/',
            topRightCorner: '\\',
            leftTall: '|',
            rightTall: '|',
            bottomLeftCorner: '\\',
            bottomRightCorner: '/',
        };
    }

    //replace tabs with spaces
    text = text.replace(/\t+/g, '    ');

    //detect the max line length
    let lines = text.split('\n');

    let maxLineLength = lines[0].length;
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].length > maxLineLength) {
            maxLineLength = lines[i].length;
        }
    }

    if (maxLineLength < wrap) {
        wrap = maxLineLength;
    } else {
        //wrap lines
        lines = wordwrap(0, wrap, {mode: 'hard'})(text).split('\n');
    }

    const pad = (text, str = ' ') => {
        return str + text + str;
    };

    //calculate offset. the max offset is wrap + 3 because the bubble should
    //connect on the same column as the right wall of the bubble.
    if (offset > wrap + 3) offset -= wrap + 3;
    else offset = 0;

    let bubble = '';

    //top
    bubble += ' '.repeat(offset) + pad(walls.top.repeat(wrap + 2)) + '\n';
    //Sides + text
    for (let i = 0; i < lines.length; i++) {
        let currLineText = lines[i];
        let currLine = ' '.repeat(offset);
        let missingChars = wrap - currLineText.length;

        if (missingChars > 0) {
            currLineText += ' '.repeat(missingChars);
        }

        if (lines.length === 1) {
            currLine += walls.left + pad(currLineText) + walls.right;
        } else if (i === 0) {
            currLine += (walls.topLeftCorner || walls.left)
                + pad(currLineText)
                + (walls.topRightCorner || walls.right);
        } else if (i === lines.length - 1) {
            currLine += (walls.bottomLeftCorner || walls.left)
                + pad(currLineText)
                + (walls.bottomRightCorner || walls.right);
        } else {
            currLine += (walls.leftTall || walls.left)
                + pad(currLineText)
                + (walls.rightTall || walls.right);
        }

        bubble += currLine + '\n';
    }
    //add bottom
    bubble += ' '.repeat(offset) + pad(walls.bottom.repeat(wrap + 2)) + '\n';
    return bubble;
}
