const fs = require('fs')

const disc = fs.readFileSync('input.txt').toString().split(''), spaces = [], files = []

let fileId = 0
for (let i = 0; i < disc.length; i++) {
    if (i % 2 === 0) {
        files.push({id: fileId, size:parseInt(disc[i])})
        fileId++
    } else {
        spaces.push(parseInt(disc[i]))
    }
}

let currentFreeSpace = spaces.shift(), fixedFile = files.shift(), i = 0, currentFile = files.pop(), checksum = 0
outerLoop: while (true) {
    while (fixedFile !== undefined && fixedFile.size > 0) {
        console.log(i + ' * ' + fixedFile.id)
        checksum += i * fixedFile.id
        i++
        fixedFile.size--
    }

    if (currentFreeSpace === 0) {
        currentFreeSpace = spaces.shift()
        fixedFile = files.shift()

        if (currentFreeSpace === undefined && currentFile.size > 0) {
            while (currentFile.size > 0) {
                console.log(i + ' * ' + currentFile.id)
                checksum += i * currentFile.id
                i++
                currentFile.size--
            }
        }
    }

    while (currentFile.size <= 0) {
        currentFile = files.pop()
        if (currentFile === undefined) {
            break outerLoop
        }
    }

    while (currentFreeSpace !== undefined && currentFreeSpace > 0 && )
    console.log(i + ' * ' + currentFile.id)
    checksum += i * currentFile.id

    currentFreeSpace--
    currentFile.size--
    i++
}

console.log(checksum)