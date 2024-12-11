const fs = require('fs')

const lines = fs.readFileSync('input.txt').toString().split('\n')

let sum = 0, found = false
function countEquation(numbers, testValue, i, actualValue, debug) {
    if (found) {
        return
    }

    if (i === numbers.length) {
        // console.log(debug + '=' + actualValue)
        if (actualValue === testValue) {
            found = true
            sum += actualValue
        }

        return
    }

    countEquation(numbers, testValue, i + 1, actualValue + numbers[i], debug + '+' + numbers[i])
    countEquation(numbers, testValue, i + 1, actualValue * numbers[i], debug + '*' + numbers[i])
    countEquation(numbers, testValue, i + 1, parseInt(actualValue.toString() + numbers[i].toString()), debug + '||' + numbers[i])
}

for (const line of lines) {
    const testValue = parseInt(line.split(': ')[0])
    const numbers = line.split(': ')[1].split(' ').map(v => parseInt(v))

    countEquation(numbers, testValue, 1, numbers[0], numbers[0].toString())
    found = false
}

console.log(sum)