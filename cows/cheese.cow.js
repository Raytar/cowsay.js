module.exports = (thoughts = '\\', eyes = 'oo', tongue = '  ') => {
    let eye = eyes[0];
    return `\
   ${thoughts}
    ${thoughts}
      _____   _________
     /     \\_/         |
    |                 ||
    |                 ||
   |    ###\\  /###   | |
   |     ${eye}  \\/  ${eye}    | |
  /|                 | |
 / |        <        |\\ \\
| /|                 | | |
| |     \\_______/   |  | |
| |        ${tongue}       | / /
/||                 /|||
   ----------------|
        | |    | |
        ***    ***
       /___\\  /___\\
`;
};
