module.exports = (thoughts = '\\', eyes = 'oo', tongue = '  ') => {
    let eye = eyes[0];
    return `\
  ${thoughts}
   ${thoughts}
      /\\_)o<
     |      \\
     | ${eye} . ${eye}|
      \\_____/
         ${tongue}
`;
};
