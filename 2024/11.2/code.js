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

    // const c = debugStones(stones)
    const currentStones = structuredClone(stones)

    for (let number in currentStones) {
        const jLim = currentStones[number].count
        for (let j = 0; j < jLim; j++) {
            if (number === '0') {
                incrementNumber(number, -1)
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