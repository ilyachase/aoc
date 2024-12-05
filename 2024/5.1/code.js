const fs = require('fs')

const rules = fs.readFileSync('rules.txt').toString().split('\n')
const updates = fs.readFileSync('updates.txt').toString().split('\n')

let sum = 0
for (let update of updates) {
    update = update.split(',').map(value => parseInt(value))
    let isUpdateCorrect = true
    for (const rule of rules) {
        const ruleNumbers = rule.split('|').map(value => parseInt(value))
        const update1Index = update.indexOf(ruleNumbers[0])
        const update2Index = update.indexOf(ruleNumbers[1])

        if (update1Index === -1 || update2Index === -1) {
            continue
        }

        if (update2Index < update1Index) {
            isUpdateCorrect = false
            break
        }
    }

    if (isUpdateCorrect) {
        sum += update[Math.floor(update.length / 2)]
    }
}

console.log(sum)
