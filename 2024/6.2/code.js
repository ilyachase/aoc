const fs = require('fs')

const originalMap = fs.readFileSync('input.txt').toString().split('\n').map(line => line.split(''))
// const originalMap = fs.readFileSync('input_example.txt').toString().split('\n').map(line => line.split(''))

const UP = 'up', RIGHT = 'right', DOWN = 'down', LEFT = 'left', OBSTACLE = '#', FREE_SPOT = '.', initialPosition = findInitialPosition()

function findInitialPosition() {
    for (let y = 0; y < originalMap.length; y++) {
        const x = originalMap[y].indexOf('^')
        if (x !== -1) {
            return [y, x]
        }
    }
}

let foundLoopsCount = 0, progress = 1

for (let mapY = 0; mapY < originalMap.length; mapY++) {
    for (let mapX = 0; mapX < originalMap[0].length; mapX++) {
        console.log('Current progress: ' + (progress++) + ' / ' + originalMap.length * originalMap[0].length)

        if (originalMap[mapY][mapX] !== FREE_SPOT) {
            continue
        }

        const map = originalMap.map(line => line.slice())
        map[mapY][mapX] = OBSTACLE

        let outOfBounds = false, foundLoop = false, currentPosition = Array.from(initialPosition), currentDirection = UP
        const turns = []

        function makeNextAction() {
            let [y, x] = currentPosition
            switch (currentDirection) {
                case UP:
                    y--

                    // The guard went out of bounds
                    if (y < 0) {
                        outOfBounds = true
                        return
                    }

                    // There is an obstacle in front of the guard - turn right
                    if (map[y][x] === OBSTACLE) {
                        currentDirection = RIGHT
                        turns.push([y, x])
                        return
                    }
                    break
                case RIGHT:
                    x++

                    // The guard went out of bounds
                    if (x > map[0].length - 1) {
                        outOfBounds = true
                        return
                    }

                    // There is an obstacle in front of the guard - turn down
                    if (map[y][x] === OBSTACLE) {
                        currentDirection = DOWN
                        turns.push([y, x])
                        return
                    }
                    break
                case DOWN:
                    y++

                    // The guard went out of bounds
                    if (y > map.length - 1) {
                        outOfBounds = true
                        return
                    }

                    // There is an obstacle in front of the guard - turn left
                    if (map[y][x] === OBSTACLE) {
                        currentDirection = LEFT
                        turns.push([y, x])
                        return
                    }
                    break
                case LEFT:
                    x--

                    // The guard went out of bounds
                    if (x < 0) {
                        outOfBounds = true
                        return
                    }

                    // There is an obstacle in front of the guard - turn up
                    if (map[y][x] === OBSTACLE) {
                        currentDirection = UP
                        turns.push([y, x])
                        return
                    }
            }

            // There is a free space in front of the guard - move forward 1 step and mark it
            currentPosition = [y, x]
        }

        function analyzeTurns() {
            // todo: check this condition - maybe not needed?
            if (turns.length < 8) {
                return
            }

            for (let possibleLoopLength = 4; possibleLoopLength * 2 <= turns.length; possibleLoopLength++) {
                const possibleLoopOne = turns.slice(-possibleLoopLength * 2).slice(0, possibleLoopLength)
                const possibleLoopTwo = turns.slice(-possibleLoopLength * 2).slice(-possibleLoopLength)

                let loopsEqual = true
                for (let i = 0; i < possibleLoopTwo.length; i++) {
                    if (possibleLoopOne[i][0] !== possibleLoopTwo[i][0] || possibleLoopOne[i][1] !== possibleLoopTwo[i][1]) {
                        loopsEqual = false
                        break
                    }
                }

                if (loopsEqual) {
                    foundLoopsCount++
                    foundLoop = true
                    break
                }
            }
        }

        do {
            let start = performance.now()
            makeNextAction()
            // console.log('makeNextAction time: ' + (performance.now() - start))
            start = performance.now()
            analyzeTurns()
            // console.log('analyzeTurns time: ' + (performance.now() - start))
            if (turns.length > 10000) {
                console.log(turns, mapY, mapX)
            }
        } while (!outOfBounds && !foundLoop)
    }
}

console.log('Found loops count: ' + foundLoopsCount)