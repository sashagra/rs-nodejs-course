module.exports = {
  ABC: 'abcdefghijklmnopqrstuvwxyz',
  actions: ['encode', 'decode'],
  ERROR_MESSAGES: {
    action: '---------- need to input -a(--action) param: encode/decode',
    shift: '---------- need to input -s(--shift) param: the number from 1 to ',
    noInputFile:
      '---------- input file does not exist or located in another folder',
    noOutputFile:
      'File reading error:\n---------- Output file does not exist or located in another folder'
  }
};
