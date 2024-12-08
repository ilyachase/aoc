const fs = require('fs')

const lines = fs.readFileSync('input_example.txt').toString().split('\n')
// const lines = fs.readFileSync('input.txt').toString().split('\n')

function countEquation(numbers, operatorVariation) {
    let answer = numbers[0]

    for (let i = 0; i < operatorVariation.length; i++) {
        if (operatorVariation[i] === '+') {
            answer += numbers[i+1]
        } else {
            answer *= numbers[i+1]
        }
    }

    return answer
}

let sum = 0
outerLoop: for (const line of lines) {
    const testValue = parseInt(line.split(': ')[0])
    const numbers = line.split(': ')[1].split(' ').map(v => parseInt(v))

    for (let [base, change] of [['+', '*'], ['*', '+']]) {
        for (let changeIndexesLessThan = 0; changeIndexesLessThan <= numbers.length - 1; changeIndexesLessThan++) {
            const operatorVariation = Array(numbers.length - 1).fill(base).map((v, i) => i < changeIndexesLessThan ? change : base)
            console.log(operatorVariation.join(''))
            if (countEquation(numbers, operatorVariation) === testValue) {
                sum += testValue
                continue outerLoop
            }

            for (let i = 0; i < operatorVariation.length; i++) {
                for (let j = 0; j < operatorVariation.length; j++) {
                    if (operatorVariation[i] === operatorVariation[j]) {
                        continue
                    }

                    const operatorVariation2 = Array.from(operatorVariation);

                    [operatorVariation2[i], operatorVariation2[j]] = [operatorVariation2[j], operatorVariation2[i]]
                    console.log(operatorVariation2.join(''))
                    if (countEquation(numbers, operatorVariation2) === testValue) {
                        sum += testValue
                        continue outerLoop
                    }
                }
            }
        }
    }
}

// console.log(sum)