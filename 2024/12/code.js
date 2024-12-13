const fs = require('fs')

const map = fs.readFileSync('input.txt').toString().split('\n').map(line => line.split(''))

const observedPlots = []

function buildRegion(map, plant, y, x, regionData, currentRegionPlots = []) {
    if (y < 0 || y > map.length - 1) {
        return
    }

    if (x < 0 || x > map[0].length - 1) {
        return
    }

    if (map[y][x] !== plant) {
        return
    }

    if (currentRegionPlots.includes(y + ',' + x)) {
        return
    }

    // update region area
    regionData.area++

    // update region perimeter
    for (let coords of [[y + 1, x, 'up'], [y, x + 1, 'right'], [y - 1, x, 'down'], [y, x - 1, 'left']]) {
        let [y, x, direction] = coords
        if ((y < 0 || y > map.length - 1) || (x < 0 || x > map[0].length - 1) || (map[y][x] !== plant)) {
            regionData.perimeter++
            regionData.perimeterCoords.push([y, x, direction])
        }
    }

    currentRegionPlots.push(y + ',' + x)
    observedPlots.push(y + ',' + x)

    buildRegion(map, plant, y + 1, x, regionData, currentRegionPlots)
    buildRegion(map, plant, y, x + 1, regionData, currentRegionPlots)
    buildRegion(map, plant, y - 1, x, regionData, currentRegionPlots)
    buildRegion(map, plant, y, x - 1, regionData, currentRegionPlots)
}

let p1 = 0, p2 = 0
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
        if (observedPlots.includes(y + ',' + x)) {
            continue
        }

        const regionData = {area: 0, perimeter: 0, perimeterCoords: []}
        buildRegion(map, map[y][x], y, x, regionData)
        p1 += regionData.area * regionData.perimeter

        const sides = {up: [], right: [], down: [], left: []}
        for (let perimeterCoord of regionData.perimeterCoords) {
            let [y, x, direction] = perimeterCoord

            if (direction === 'up' && !sides.up.includes(y)) {
                sides.up.push(y)
            }

            if (direction === 'right' && !sides.right.includes(x)) {
                sides.right.push(x)
            }

            if (direction === 'down' && !sides.down.includes(y)) {
                sides.down.push(y)
            }

            if (direction === 'left' && !sides.left.includes(x)) {
                sides.left.push(x)
            }
        }
        const sidesCount = Object.keys(sides).reduce((acc, dir) => acc + sides[dir].length, 0)
        p2 += regionData.area * sidesCount
    }
}

console.log(p1)
console.log(p2)
