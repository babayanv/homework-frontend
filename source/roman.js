'use strict';


const asRoman = function(value) {
    const lookup = [
        ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'XI'],
        ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
        ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
        ['M', 'MM', 'MMM']
    ];
    return value.split('').reverse().map(numeral => parseInt(numeral)).reduce((result, curr, index, digits) => {
        return curr > 0 ? lookup[index][curr - 1] + result : result;
    }, "");
}


const asDecimal = function(value) {
    const romanToDecimal = {
        'i': 1,
        'v': 5,
        'x': 10,
        'l': 50,
        'c': 100,
        'd': 500,
        'm': 1000
    }

    return value.toLowerCase().split('').map(num => romanToDecimal[num]).reduce((result, curr, index, digits) => {
        if(curr === undefined) {
            throw RangeError('Unexpected roman numeral');
        }
        var prev = index > 0 ? digits[index - 1] : 0;
        return prev < curr ? result + curr - 2 * prev : result + curr;
    }, 0);
}


const roman = function(value) {
    if(typeof(value) == 'number') {
        if(value <= 0) {
            throw RangeError('Only positive numbers allowed');
        }
        value = value.toString();
    }

    return isNaN(value) ? asDecimal(value) : asRoman(value);
}