/*eslint-disable */
const path = require('path');
const fs = require('fs');
const constants = require('./constants');

module.exports = function validateInputParams(params) {
  const errors = ['Input errors:'];
  let inputFilePath;
  let outputFilePath;

  if (params.input) {
    inputFilePath = inputFilePath = path.join(__dirname, '..', params.input);
    try {
      fs.accessSync(inputFilePath, fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
      errors.push(constants.ERROR_MESSAGES.noInputFile);
    }
  }

  if (
    !+params.shift ||
    +params.shift > constants.ABC.length ||
    +params.shift < 1
  ) {
    errors.push(constants.ERROR_MESSAGES.shift + (constants.ABC.length - 1));
  }

  if (!constants.actions.includes(params.action)) {
    errors.push(constants.ERROR_MESSAGES.action);
  }

  if (errors.length > 1) {
    process.stderr.write(`${errors.join('\n')}\n`);
    process.exit(9);
  }

  if (params.output) {
    outputFilePath = outputFilePath = path.join(__dirname, '..', params.output);
    try {
      fs.accessSync(outputFilePath, fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
      process.stderr.write(`${constants.ERROR_MESSAGES.noOutputFile}\n`);
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    }
  }
  return {
    inputFilePath,
    outputFilePath,
    shift: +params.shift,
    action: params.action
  };
};
