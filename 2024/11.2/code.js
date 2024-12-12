const fs = require('fs')

const stones = fs.readFileSync('input.txt').toString().split(' ').map(v => parseInt(v))

let length = 0
let leafs = 0
function analyzeStones(depth, currentLength, stones) {
    for (let j = 0; j < stones.length; j++) {
        if (stones[j] === 0) {
            stones[j] = 1
        } else if (stones[j].toString().length % 2 === 0) {
            const oldStone = stones[j].toString()
            stones[j] = parseInt(oldStone.substring(0, Math.floor(oldStone.length / 2)))
            stones.splice(j + 1, 0, parseInt(oldStone.substring(Math.floor(oldStone.length / 2))))
            j++
        } else {
            stones[j] *= 2024
        }
    }

    if (depth === 74) {
        length += stones.length
        leafs--
        console.log(leafs)
        return
    }

    // currentLength += (stones.length - beforeLength)

    for (let stone of stones) {
        leafs++
        analyzeStones(depth + 1, currentLength, [stone])
    }
}

analyzeStones(0, stones.length, stones)

console.log(length)
