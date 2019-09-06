'use strict';

const decimalToRoman = value => {
    const romanDigits = [
        ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'XI'],
        ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
        ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
        ['M', 'MM', 'MMM']
    ];

    return value.split('')
        .reverse()
        .map(numeral => parseInt(numeral))
        .reduce((result, curr, index) => {
            return curr > 0 ? romanDigits[index][curr - 1] + result : result;
        }, "");
}

const romanToDecimal = value => {
    const romanDigits = {
        'i': 1,
        'v': 5,
        'x': 10,
        'l': 50,
        'c': 100,
        'd': 500,
        'm': 1000
    };

    return value.toLowerCase()
        .split('')
        .map(num => romanDigits[num])
        .reduce((result, curr, index, digits) => {
            if(!curr) {
                throw RangeError('Unexpected roman numeral');
            }

            const prev = index > 0 ? digits[index - 1] : 0;
        
            return prev < curr ? result + curr - 2 * prev : result + curr;
        }, 0);
}

const roman = value => {
    if(typeof value !== 'string' && typeof value !== 'number') {
        throw TypeError('Invalid argument');
    }

    if(isNaN(value)) {
        return romanToDecimal(value);
    }

    if(value <= 0) {
        throw RangeError('Only positive numbers allowed');
    }

    return decimalToRoman(value.toString());
}
