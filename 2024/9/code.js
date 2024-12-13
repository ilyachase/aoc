const fs = require('fs')

const disc = fs.readFileSync('input.txt').toString().split('')

function parseInput(disc) {
    const files = [], spaces = []
    let fileId = 0
    for (let i = 0; i < disc.length; i++) {
        if (i % 2 === 0) {
            files.push({id: fileId, size: parseInt(disc[i])})
            fileId++
        } else {
            spaces.push(parseInt(disc[i]))
        }
    }
    return [files, spaces]
}

const [files, spaces] = parseInput(disc)

console.log(files,spaces)