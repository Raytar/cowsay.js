module.exports = (thoughts = '\\', eyes = 'oo', tongue = '  ') => {
    eyes = eyes.length === 3 ? eyes : new Array(4).join(eyes[0]);
    return `\
        ${thoughts}  ^___^
         ${thoughts} (${eyes})\\_______
           (___)\\       )\\/\\
            ${tongue}  ||----w |
                ||     ||
`;
};
