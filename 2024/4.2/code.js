const fs = require('fs')

const words = fs.readFileSync('input.txt').toString().split('\n')
// const words = fs.readFileSync('input_example.txt').toString().split('\n')

function safeAccess(array, y, x) {
    if (array[y] && array[y][x] !== undefined) {
        return array[y][x];
    }

    return '';
}

let xmas = 0, axis
for (let y = 0; y < words.length; y++) {
    for (let x = 0; x < words[0].length; x++) {
        // find the core of the X
        if (safeAccess(words, y, x) !== 'A') {
            continue
        }

        // check the first axis
        axis = safeAccess(words, y - 1, x - 1) + safeAccess(words, y, x) + safeAccess(words, y + 1, x + 1)
        if (axis !== 'MAS' && axis !== 'SAM') {
            continue
        }

        // check the second axis
        axis = safeAccess(words, y - 1, x + 1) + safeAccess(words, y, x) + safeAccess(words, y + 1, x - 1)
        if (axis !== 'MAS' && axis !== 'SAM') {
            continue
        }

        xmas++
    }
}

console.log(xmas)