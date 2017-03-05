module.exports = (thoughts = '\\', eyes = 'oo', tongue = '  ') => {
    let extra = eyes[0];
    return `\
 ${thoughts}
  ${thoughts}
  ,-''''-.
 (.  ,.   L        ___...__
 /${extra}} ,-\`  \`'-==''\`\`        ''._
//{                           '\`.
\\_,X ,                         : )
 ${tongue} 7                          ;\`
    :                  ,       /
     \\_,                \\     ;
       Y   L_    __..--':\`.    L
       |  /| \`\`\`\`       ;  y  J
       [ j J            / / L ;
       | |Y \\          /_J  | |
       L_J/_)         /_)   L_J
      /_)               sk /_)
`;
};
