const fs = require('fs')
const path = require('path')

const filename = 'input02.txt'
const filepath = path.join(__dirname, filename)
const aCode = 65

function charToPriority(ch) {
  const charNum = ch.charCodeAt(0)

  return charNum > 96 ? charNum - 96 : charNum - 38
}

// const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKL'

// console.log(str.split('').map(charToPriority))



function part1() {
  const file = fs.readFileSync(filepath, 'utf8')
  const lines = file.split('\n')
  const bagContexts = lines.map(v => v.split(''))
  const contentsToPriorities = bagContexts.map(contents => contents.map(charToPriority))
  const bagSplits = contentsToPriorities.map(bag1 => {
    const bag2 = bag1.splice(0, bag1.length/2)
    return [bag1, bag2]
  })

  const commonelement = bagSplits.map(bags => bags[0].find(v => bags[1].includes(v)))
  const elementSum = commonelement.reduce((a,v) => a+v, 0)

  console.log(`Sum of all the shared elements is ${elementSum}`)
}


function part2() {
  const file = fs.readFileSync(filepath, 'utf8')
  const lines = file.split('\n')
  const bagContexts = lines.map(v => v.split(''))
  const contentsToPriorities = bagContexts.map(contents => contents.map(charToPriority))
  const combineGroups = Array(contentsToPriorities.length/3)
  let groupCount = 0
  contentsToPriorities.forEach((group, i) => {

    if(i !== 0 && i % 3 === 0) {
      groupCount++
    }

    if(!combineGroups[groupCount]) {
      combineGroups[groupCount] = [group]
    } else {
      combineGroups[groupCount].push(group)
    }
  })

  const badgeIds = combineGroups.map(group => {
    const shared = group[0].filter(v => group[1].includes(v))
    return shared.find(v => group[2].includes(v))
  })

  const badgeSums = badgeIds.reduce((a,v) => a+v, 0)
  console.log(`Some of the badge Items is ${badgeSums}`)
 
}

part2() 
