module.exports = (thoughts = '\\', eyes = 'oo', tongue = '  ') => {
    let extra = eyes[0];
    return `\
                 ${thoughts}
                  ${thoughts}  _,._
                 __.'   _)
                <_,)'.-"${extra}\\
                  /' (    \\
      _.-----..,-'   (\`"--^
     //              |   ${tongue}
    (|   \`;      ,   |
      \\   ;.----/  ,/
       ) // /   | |\\ \\
       \\ \\\\\`\\   | |/ /
        \\ \\\\ \\  | |\\/
`;
};
