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

function buildSegments(files, spaces) {
    let nextFile, nextSpace, segments = ''
    do {
        nextFile = files.shift()
        nextSpace = spaces.shift()

        if (nextFile) {
            segments += nextFile.id.toString().repeat(nextFile.size)
        }

        if (nextSpace) {
            segments += '.'.repeat(nextSpace)
        }

    } while (nextFile || nextSpace)

    return segments
}

function optimizeSegments(segments) {
    segments = segments.split('')
    for (let i = segments.length - 1; i > 0; i--) {
        if (segments[i] === '.') {
            continue
        }

        for (let j = 0; j < i; j++) {
            if (segments[j] === '.') {
                [segments[j], segments[i]] = [segments[i], segments[j]]
            }
        }
    }

    return segments.join('')
}

function calculateChecksum(optimizedSegments) {
    let checksum = 0
    for (let i = 0; i < optimizedSegments.length; i++) {
        if (optimizedSegments[i] === '.') {
            break
        }

        checksum += i * parseInt(optimizedSegments[i])
    }

    return checksum
}

const [files, spaces] = parseInput(disc)

const segments = buildSegments(files, spaces)

const optimizedSegments = optimizeSegments(segments)

const checksum = calculateChecksum(optimizedSegments)

console.log(checksum)