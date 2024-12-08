const fs = require('fs')

const lines = fs.readFileSync('input.txt').toString().split('\n')
// const lines = fs.readFileSync('input_example.txt').toString().split('\n')

function countEquation(numbers, operatorVariation) {
    let answer = numbers[0]

    for (let i = 0; i < operatorVariation.length; i++) {
        if (operatorVariation[i] === '+') {
            answer += numbers[i + 1]
        } else {
            answer *= numbers[i + 1]
        }
    }

    return answer
}

let sum = 0
let c = 0
outerLoop: for (const line of lines) {
    c++
    console.log(c + ' / ' + lines.length)
    const testValue = parseInt(line.split(': ')[0])
    const numbers = line.split(': ')[1].split(' ').map(v => parseInt(v))

    for (let amountOfMultiplications = 0; amountOfMultiplications < numbers.length - 1; amountOfMultiplications++) {

    }
}

console.log(sum)