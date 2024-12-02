const fs = require('fs')

function checkLevels(levels) {
    const increasing = levels[1] > levels[0]

    let isLevelSafe = true
    levels.forEach((value, index, array) => {
        if (index === 0 || !isLevelSafe) {
            return
        }

        const levelsDifference = Math.abs(value - array[index - 1])
        if (levelsDifference < 1 || levelsDifference > 3) {
            isLevelSafe = false
            return
        }

        if (increasing && value < array[index - 1]) {
            isLevelSafe = false
            return
        }

        if (!increasing && value > array[index - 1]) {
            isLevelSafe = false
        }
    })

    return isLevelSafe
}

const reports = fs.readFileSync('input.txt').toString().split('\n')

let safeReportsCount = 0
for (let report of reports) {
    const levels = report.split(' ').map(str => parseInt(str))

    let isLevelSafe = checkLevels(levels)
    for (let index = 0; index < levels.length; index++) {
        if (isLevelSafe) {
            break
        }

        const splicedLevels = Array.from(levels)
        splicedLevels.splice(index, 1)

        isLevelSafe = checkLevels(splicedLevels)
    }

    if (isLevelSafe) {
        safeReportsCount++
    }
}

console.log(`Safe reports count: ${safeReportsCount}`)
