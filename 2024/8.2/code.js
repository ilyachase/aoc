const fs = require('fs')

const map = fs.readFileSync('input.txt').toString().split('\n').map(line => line.split(''))
const antinodesMap = Array.from({ length: map.length }, () => Array(map[0].length).fill('.'))

function addAntiNode(y, x) {
    if (y > antinodesMap.length - 1 || x > antinodesMap[0].length - 1) {
        return
    }

    if (y < 0 || x < 0) {
        return;
    }

    console.log('Adding node at ' + y + ',' + x)

    antinodesMap[y][x] = '#'
}

function findFriends(map, me_y, me_x) {
    const me = map[me_y][me_x]
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (y === me_y && x === me_x) {
                continue
            }

            if (map[y][x] === me) {
                const diffX = Math.abs(me_x - x)
                const diffY = Math.abs(me_y - y)
                const antinode1X = me_x < x ? x + diffX : x - diffX
                const antinode1Y = me_y < y ? y + diffY : y - diffY
                addAntiNode(antinode1Y, antinode1X)
            }
        }
    }
}

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
        if (map[y][x] !== '.') {
            findFriends(map, y, x)
        }
    }
}


let c = 0
for (let y = 0; y < antinodesMap.length; y++) {
    for (let x = 0; x < antinodesMap[0].length; x++) {
        if (antinodesMap[y][x] === '#') {
            c++
        }
    }
}

console.log(c)