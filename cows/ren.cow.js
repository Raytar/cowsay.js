module.exports = (thoughts = '\\', eyes = 'oo') => {
    let eye = eyes[0];
    return `\
   ${thoughts}
    ${thoughts}
    ____
   /# /_\\_
  |  |/${eye}\\${eye}\\
  |  \\\\_/_/
 / |_   |
|  ||\\_ ~|
|  ||| \\/
|  |||_
 \\//  |
  ||  |
  ||_  \\
  \\_|  o|
  /\\___/
 /  ||||__
    (___)_)
`;
};
