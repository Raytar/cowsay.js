module.exports = (thoughts = '\\', eyes = 'oo') => {
    let eye = eyes[0];
    return `\
 ${thoughts}
  ${thoughts}
     .--.              .--.
    : (\\ ". _......_ ." /) :
     '.    \`        \`    .'
      /'   _        _   \`\\
     /     ${eye}}      {${eye}     \\
    |       /      \\       |
    |     /'        \`\\     |
     \\   | .  .==.  . |   /
      '._ \\.' \\__/ './ _.'
      /  \`\`'._-''-_.'\`\`  \\
`;
};
