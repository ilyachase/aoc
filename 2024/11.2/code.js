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
    }
}

for (let i = 0; i < 75; i++) {
    for (let number in stones) {
        if (stones[number].count <= 0) {
            delete stones[number]
        }
    }

    console.log(i)
    // const c = debugStones(stones)
    const currentStones = structuredClone(stones)

    for (let number in currentStones) {
        const numberCount = currentStones[number].count
        if (number === '0') {
            incrementNumber(1, numberCount)
        } else if (number.length % 2 === 0) {
            incrementNumber(parseInt(number.substring(0, Math.floor(number.length / 2))), numberCount)
            incrementNumber(parseInt(number.substring(Math.floor(number.length / 2))), numberCount)
        } else {
            incrementNumber(number * 2024, numberCount)
        }
        incrementNumber(number, -1 * numberCount)
    }
}

function debugStones(stones) {
    const res = []
    for (let number of Object.keys(stones).reverse()) {
        for (let j = 0; j < stones[number].count; j++) {
            res.push(stones[number].value)
        }
    }

    return res.join(' ') + ' = ' + res.length
}

const length = Object.keys(stones).reduce((acc, number) => acc + stones[number].count, 0)

console.log(length)