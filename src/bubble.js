const wordwrap = require('wordwrap');

module.exports = bubble;

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
    text = text.replace(/\t+/g, '    '); //replace tabs with spaces

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

    //calculate offset
    if (offset > wrap + 4) offset -= wrap + 3;
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
            currLine += ' '.repeat(missingChars);
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
