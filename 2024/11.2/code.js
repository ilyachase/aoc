const fs = require('fs')

let stones = {}
fs.readFileSync('input.txt').toString().split(' ').map(v => incrementNumber(v, 1))

function newNumber(number, count) {
    return {
        count,
        value: parseInt(number),
    }
}

function incrementNumber(number, increment) {
    if (!stones[number]) {
        stones[number] = newNumber(number, increment)
    } else {
        stones[number].count += increment
        if (stones[number].count <= 0) {
            delete stones[number]
        }
    }
}

for (let i = 0; i < 25; i++) {
    const currentStones = Object.keys(stones)
    for (let number of currentStones) {
        for (let j = 0; j < stones[number].count; j++) {
            if (number === '0') {
                incrementNumber(1, 1)
            } else if (number.length % 2 === 0) {
                incrementNumber(number, -1)
                incrementNumber(parseInt(number.substring(0, Math.floor(number.length / 2))), 1)
                incrementNumber(parseInt(number.substring(Math.floor(number.length / 2))), 1)
            } else {
                incrementNumber(number, -1)
                incrementNumber(number * 2024, 1)
            }
        }
    }
}

let length = 0
for (let number in stones) {
    length += stones[number].count
}

console.log(length)