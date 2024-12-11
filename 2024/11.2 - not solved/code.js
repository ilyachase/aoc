const fs = require('fs')

const stones = fs.readFileSync('input.txt').toString().split(' ').map(v => parseInt(v))

const lengths = []
for (let i = 0; i < 25; i++) {
    console.log(stones.join(' ') + ' (' + stones.length + ')')
    lengths.push(stones.length)
    for (let j = 0; j < stones.length; j++) {
        if (stones[j] === 0) {
            stones[j] = 1
        } else if (stones[j].toString().length % 2 === 0) {
            const oldStone = stones[j].toString()
            stones[j] = parseInt(oldStone.substring(0, Math.floor(oldStone.length / 2)))
            stones.splice(j+1, 0, parseInt(oldStone.substring(Math.floor(oldStone.length / 2))))
            j++
        } else {
            stones[j] *= 2024
        }
    }
}

console.log(stones.join(' ') + ' (' + stones.length + ')')
console.log(lengths.join(' '))

console.log(stones.length)
