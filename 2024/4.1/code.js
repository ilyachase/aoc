const fs = require('fs')

const words = fs.readFileSync('input.txt').toString().split('\n')
// const words = fs.readFileSync('input_example.txt').toString().split('\n')

function safeAccess(array, y, x) {
    if (array[y] && array[y][x] !== undefined) {
        return array[y][x];
    }

    return '';
}

let xmas = 0
for (let y = 0; y < words.length; y++) {
    for (let x = 0; x < words[0].length; x++) {
        // horizontal
        if (safeAccess(words, y, x) + safeAccess(words, y, x + 1) + safeAccess(words, y, x + 2) + safeAccess(words, y, x + 3) === 'XMAS') {
            xmas++
        }

        // horizontal - backwards
        if (safeAccess(words, y, x) + safeAccess(words, y, x - 1) + safeAccess(words, y, x - 2) + safeAccess(words, y, x - 3) === 'XMAS') {
            xmas++
        }

        // vertical
        if (safeAccess(words, y, x) + safeAccess(words, y + 1, x) + safeAccess(words, y + 2, x) + safeAccess(words, y + 3, x) === 'XMAS') {
            xmas++
        }

        // vertical - backwards
        if (safeAccess(words, y, x) + safeAccess(words, y - 1, x) + safeAccess(words, y - 2, x) + safeAccess(words, y - 3, x) === 'XMAS') {
            xmas++
        }

        // diagonal
        if (safeAccess(words, y, x) + safeAccess(words, y + 1, x + 1) + safeAccess(words, y + 2, x + 2) + safeAccess(words, y + 3, x + 3) === 'XMAS') {
            xmas++
        }

        // diagonal - 2
        if (safeAccess(words, y, x) + safeAccess(words, y + 1, x - 1) + safeAccess(words, y + 2, x - 2) + safeAccess(words, y + 3, x - 3) === 'XMAS') {
            xmas++
        }

        // diagonal - backwards
        if (safeAccess(words, y, x) + safeAccess(words, y - 1, x + 1) + safeAccess(words, y - 2, x + 2) + safeAccess(words, y - 3, x + 3) === 'XMAS') {
            xmas++
        }

        // diagonal - 2 - backwards
        if (safeAccess(words, y, x) + safeAccess(words, y - 1, x - 1) + safeAccess(words, y - 2, x - 2) + safeAccess(words, y - 3, x - 3) === 'XMAS') {
            xmas++
        }
    }
}

console.log(xmas)