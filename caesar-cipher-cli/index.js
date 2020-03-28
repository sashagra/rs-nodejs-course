const { program } = require('commander');
const createStream = require('./comnponents/create-stream');
const through2 = require('through2');
const codeDecodeStr = require('./comnponents/coder');
const { pipeline } = require('stream');
const validateInputParams = require('./comnponents/validate-params');

program
  .option('-s, --shift <num>', 'a shift')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .option('-a, --action <action>', 'an action encode/decode')
  .parse(process.argv);

const options = validateInputParams(program);

const transformText = through2((data, enc, cb) => {
  cb(
    null,
    Buffer.from(codeDecodeStr(data.toString(), options.shift, options.action))
  );
});

pipeline(
  createStream.newReadSteam(options.inputFilePath),
  transformText,
  createStream.newWritSteam(options.outputFilePath),
  err => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log(
        'Text was encoded/decoded succeeded. Look at the file:',
        options.outputFilePath
      );
    }
  }
);
