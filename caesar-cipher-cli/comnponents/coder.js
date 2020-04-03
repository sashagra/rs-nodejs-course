const constants = require('./constants');

module.exports = (inputStr, key, param) => {
  let ABC = constants.ABC;
  if (param === 'decode') {
    ABC = ABC.split('')
      .reverse()
      .join('');
  }

  let output = '';
  for (const letter of inputStr) {
    output += symbolCoder(letter);
  }

  function symbolCoder(symbol) {
    if (ABC.indexOf(symbol.toLowerCase()) >= 0) {
      let index = ABC.indexOf(symbol.toLowerCase()) + key;
      if (index >= ABC.length) {
        index -= ABC.length;
      }
      if (symbol === symbol.toUpperCase()) {
        symbol = ABC[index].toUpperCase();
      } else symbol = ABC[index];
    }
    return symbol;
  }
  return output;
};
