const bubble = require('./bubble');
const fs = require('fs');
const path = require('path');

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

    if (!options.text) options.text = '';

    let output = bubble(options.text, options.W, cowthink);
    try {
        output += cow(cowthink ? 'o' : '\\', options.e, options.T);
    } catch (e) {
        return `Problem with cowfile '${file}': ${e.message}`;
    }

    return output;
}

/**
 * Load a cowfile
 * @param {string} name name of the cowfile
 * @param {folder} folder the folder where the cowfile is located
 * @returns {function} a function that generates the cow.
 */
function loadCow(name, folder = path.join(__dirname, '../cows/')) {
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
        files = fs.readdirSync(path.join(__dirname, '../cows/'));
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
