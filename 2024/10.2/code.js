const fs = require('fs')

const map = fs.readFileSync('input.txt').toString().split('\n').map(line => line.split('').map(v => parseInt(v)))

let foundTrails = {}
let score = 0

function checkTrail(trailHead, currentTrail, map, currentHeight, y, x) {
    if (y < 0 || y >= map.length) {
        return
    }

    if (x < 0 || x >= map[0].length) {
        return
    }

    if (isNaN(map[y][x])) {
        return;
    }

    if (map[y][x] - 1 !== currentHeight) {
        return
    }

    currentTrail += '[' + y + ']' + '[' + x + ']' + '=' + map[y][x]

    if (map[y][x] === 9) {
        if (foundTrails[trailHead] === undefined) {
            foundTrails[trailHead] = []
        }

        if (!foundTrails[trailHead].includes('[' + y + ']' + '[' + x + ']')) {
            score++
            console.log(currentTrail)
            foundTrails[trailHead].push('[' + y + ']' + '[' + x + ']')
        }

        return
    }

    checkTrail(trailHead, currentTrail, map, map[y][x], y - 1, x)
    checkTrail(trailHead, currentTrail, map, map[y][x], y, x + 1)
    checkTrail(trailHead, currentTrail, map, map[y][x], y + 1, x)
    checkTrail(trailHead, currentTrail, map, map[y][x], y, x - 1)
}

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
        let oldScore = score
        if (map[y][x] !== 0) {
            continue
        }

        let currentTrail = '[' + y + ']' + '[' + x + ']' + '=' + map[y][x]
        checkTrail('[' + y + ']' + '[' + x + ']', currentTrail, map, map[y][x], y - 1, x)
        checkTrail('[' + y + ']' + '[' + x + ']', currentTrail, map, map[y][x], y, x + 1)
        checkTrail('[' + y + ']' + '[' + x + ']', currentTrail, map, map[y][x], y + 1, x)
        checkTrail('[' + y + ']' + '[' + x + ']', currentTrail, map, map[y][x], y, x - 1)

        if (score - oldScore > 0) {
            console.log('Tailhead score: ' + (score - oldScore))
        }
    }
}

console.log('Total score: ' + score)
