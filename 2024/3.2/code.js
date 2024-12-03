const fs = require('fs')

const memory = fs.readFileSync('input.txt').toString()
const matches = memory.matchAll('mul\\((\\d{1,3}),(\\d{1,3})\\)|do\\(\\)|don\'t\\(\\)')

let sum = 0
let enabled = true
for (const match of matches) {
    if (match[0] === 'don\'t()') {
        enabled = false
        continue
    }

    if (match[0] === 'do()') {
        enabled = true
        continue
    }

    if (!enabled) {
        continue
    }

    sum += parseInt(match[1]) * parseInt(match[2])
}

console.log(sum)
