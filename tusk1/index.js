const { program } = require('commander');
const fs = require('fs')
const path = require('path')

const ABC = 'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстифуцчшщъыьэюя'

program
  .option('-s, --shift <num>', 'a shift')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .option('-a, --action <action>', 'an action encode/decode');

program.parse(process.argv);

const FILE = fs.readFileSync(program.input, 'utf-8') || ''
const output = []

paramsChecker(program)

const shift = shiftOptimization(program.shift, ABC)


for (letter of FILE) {
    output.push(codeDecodeLetter(letter, ABC, shift, program.action))
}
if (output.length < 1) {
    output.push(ERROR_MESSAGE)
}

fs.writeFileSync(program.output, output.join(''), 'utf-8')

function codeDecodeLetter(symbol, string, key, param) {
    if (param === 'decode') {
        string = string.split("").reverse().join("")
    }

    if (string.indexOf(symbol.toLowerCase()) < 0) {
        return symbol
    }
    let index = string.indexOf(symbol.toLowerCase()) + key
    if (index >= string.length) {
        index -= string.length
    }
    if (symbol === symbol.toUpperCase()) {
        symbol = string[index].toUpperCase()
    } else symbol = string[index]
    
    return symbol
}

function shiftOptimization(num, string) {
    num = Number(num.slice(0, 2))
    while (num >= string.length) {
        num -= string.length
    }
    return num || 1
}

function paramsChecker(params) {
    const ERROR_MESSAGES = {
        encode: 'You need to input -a(--action) param: encode/decode',
        shift: `Input shift param (--shift or -s) the number from 1 to ${ABC.length - 2}`
    }
    const errors = ['Input errors:']
    if (params.action !== 'encode' && params.action !== 'decode') {
        errors.push(ERROR_MESSAGES.encode)
    }

    if (!+params.shift || +params.shift > ABC.length - 2) {
        errors.push(ERROR_MESSAGES.shift)
    }
    if (errors.length > 1) {
        throw new Error(errors.join('\n'))
    }
}