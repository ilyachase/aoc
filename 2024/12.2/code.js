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

    if (currentRegionPlots.includes(y+','+x)) {
        return
    }

    // update region area
    regionData.area++
    // update region perimeter

    currentRegionPlots.push(y+','+x)
    observedPlots.push(y+','+x)

    buildRegion(map, plant, y + 1, x, regionData, currentRegionPlots)
    buildRegion(map, plant, y, x + 1, regionData, currentRegionPlots)
    buildRegion(map, plant, y - 1, x, regionData, currentRegionPlots)
    buildRegion(map, plant, y, x - 1, regionData, currentRegionPlots)
}

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
        if (observedPlots.includes(y+','+x)) {
            continue
        }

        const regionData = {area: 0, perimeter: 0}
        buildRegion(map, map[y][x], y, x, regionData)
        const c = 123
    }
}
