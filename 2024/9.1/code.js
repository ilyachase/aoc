const fs = require('fs')

const disc = fs.readFileSync('input.txt').toString().split(''), spaces = [], files = []

let fileId = 0
for (let i = 0; i < disc.length; i++) {
    if (i % 2 === 0) {
        files.push({id: fileId, size: parseInt(disc[i])})
        fileId++
    } else {
        spaces.push(parseInt(disc[i]))
    }
}

let currentFreeSpace = undefined, fixedFile, i = 0, poppedFile = undefined, checksum = 0
while (true) {
    // start with fixed file
    fixedFile = files.shift()
    if (fixedFile !== undefined) {
        while (fixedFile.size > 0) {
            console.log(i + ' * ' + fixedFile.id)
            checksum += i * fixedFile.id
            i++
            fixedFile.size--
        }
    } else if (poppedFile !== undefined) {
        // if no fixed files - check poppedFile tail
        while (poppedFile.size > 0) {
            console.log(i + ' * ' + poppedFile.id)
            checksum += i * poppedFile.id
            i++
            poppedFile.size--
        }
    }

    // get next free space
    currentFreeSpace = spaces.shift()
    if (currentFreeSpace !== undefined && currentFreeSpace > 0) {
        // if got free space - squeeze in poppedFile
        poppedFile = files.pop()
        if (poppedFile === undefined) {
            break
        }

        while (currentFreeSpace > 0 && poppedFile.size > 0) {
            console.log(i + ' * ' + poppedFile.id)
            checksum += i * poppedFile.id
            i++
            poppedFile.size--
            currentFreeSpace--
        }
    }
}

console.log(checksum)