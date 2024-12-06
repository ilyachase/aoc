const fs = require('fs')

const map = fs.readFileSync('input.txt').toString().split('\n').map(line => line.split('')), markedMap = map.map(line => line.slice())
// const map = fs.readFileSync('input_example.txt').toString().split('\n').map(line => line.split('')), markedMap = map.map(line => line.slice())

const UP = 'up', RIGHT = 'right', DOWN = 'down', LEFT = 'left', OBSTACLE = '#', MARKED = 'X'

let outOfBounds, currentPosition = findAndMarkInitialPosition(), currentDirection = UP, visitedPositionsCount = 1
do {
    makeNextAction()
} while (!outOfBounds)

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
                return
            }
    }

    // There is a free space in front of the guard - move forward 1 step and mark it
    currentPosition = [y, x]
    markedMap[y][x] = MARKED
}

function findAndMarkInitialPosition() {
    for (let y = 0; y < map.length; y++) {
        const x = map[y].indexOf('^')
        if (x !== -1) {
            markedMap[y][x] = MARKED
            return [y, x]
        }
    }
}

function countMarkedPositions(markedMap) {
    let count = 0
    for (const line of markedMap) {
        for (const element of line) {
            if (element === MARKED) {
                count++
            }
        }
    }

    return count
}

console.log(countMarkedPositions(markedMap))