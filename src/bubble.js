const wordwrap = require('wordwrap');

module.exports = bubble;

/**
 * Create the bubble
 * @param {string} text The text to put in the bubble
 * @param {number} wrap The column to wrap the text const. Default 80
 * @param {boolean} cowthink Decides if a speech bubble or a thought bubble
 * should be created.
 * @returns {string}
 */
function bubble(text, wrap = 80, cowthink = false) {
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
        //remove newlines
        lines = lines.map((line) => {
            return line.replace('\n', '');
        });
    }

    const pad = (text, str = ' ') => {
        return str + text + str;
    };

    let bubble = '';

    //top
    bubble += pad(walls.top.repeat(wrap + 2)) + '\n';
    //Sides + text
    for (let i = 0; i < lines.length; i++) {
        let currLine = lines[i];
        let missingChars = wrap - currLine.length - 1;

        if (missingChars > 0) {
            currLine += ' '.repeat(missingChars);
        }

        if (lines.length === 1) {
            bubble += walls.left + pad(currLine) + walls.right;
        } else if (i === 0) {
            bubble += (walls.topLeftCorner || walls.left)
                    + pad(currLine)
                    + (walls.topRightCorner || walls.right);
        } else if (i === lines.length - 1) {
            bubble += (walls.bottomLeftCorner || walls.left)
                    + pad(currLine)
                    + (walls.bottomRightCorner || walls.right);
        } else {
            bubble += (walls.leftTall || walls.left)
                    + pad(currLine)
                    + (walls.rightTall || walls.right);
        }

        bubble += '\n';
    }
    //add bottom
    bubble += pad(walls.bottom.repeat(wrap + 2)) + '\n';
    return bubble;
}
