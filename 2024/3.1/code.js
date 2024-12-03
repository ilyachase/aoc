const fs = require('fs')

const memory = fs.readFileSync('input.txt').toString()
const matches = memory.matchAll('mul\\((\\d{1,3}),(\\d{1,3})\\)')

let sum = 0
for (const match of matches) {
    sum += parseInt(match[1]) * parseInt(match[2])
}

console.log(sum)