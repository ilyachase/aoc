const fs = require('fs')

const map = fs.readFileSync('input.txt').toString().split('\n').map(line => line.split(''))
const antinodesMap = Array.from({length: map.length}, () => Array(map[0].length).fill('.'))

function addAntiNode(y, x) {
    if (y > antinodesMap.length - 1 || x > antinodesMap[0].length - 1) {
        return
    }

    if (y < 0 || x < 0) {
        return;
    }

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
                let antinode1X = me_x
                let antinode1Y = me_y
                do {
                    antinode1X = me_x < x ? antinode1X + diffX : antinode1X - diffX
                    antinode1Y = me_y < y ? antinode1Y + diffY : antinode1Y - diffY
                    console.log('From ' + y + ',' + x + ' adding node at ' + y + ',' + x)
                    addAntiNode(antinode1Y, antinode1X)
                } while ((antinode1X > 0 && antinode1X < map[0].length - 1) && (antinode1Y > 0 && antinode1Y < map.length - 1))
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