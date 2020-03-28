const fs = require('fs');
module.exports = {
  newWritSteam(outfile) {
    if (!outfile) {
      return process.stdout;
    }
    return fs.createWriteStream(outfile, { flags: 'a' });
  },
  newReadSteam(infile) {
    if (!infile) {
      return process.stdin;
    }
    return fs.createReadStream(infile);
  }
};
