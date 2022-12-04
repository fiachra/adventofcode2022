const fs = require('fs')
const path = require('path')
const { mainModule } = require('process')

const filename = 'input02.txt'
const filepath = path.join(__dirname, filename)

function itemOverlap(itemA, itemB) {
  return (itemA.min >= itemB.min && itemA.max <= itemB.max) || (itemB.min >= itemA.min && itemB.max <= itemA.max)
}

function itemNoOverlap(itemA, itemB) {
  return (itemA.min > itemB.max || itemA.max < itemB.min)
}

function getOverlaps(original) {
  const updateable = [...original]
  let overlapCounter = 0
  while (updateable.length) {
    const item = updateable.pop()
    const overlap = updateable.find(listItem => itemOverlap(item, listItem))

    if(overlap) {
      overlapCounter++
      console.log(`${JSON.stringify(item)} overlaps with ${JSON.stringify(overlap)}`)
    }
  }

  return overlapCounter
}

function part1n2() {
  const file = fs.readFileSync(filepath, 'utf8')
  const lines = file.split('\n')

  const cleaningSectionPairs = lines.map((line) => {
    return line.split(',').map(section => {
      const [min,max] = section.split('-').map(Number)
      const range = [...Array((max+1)-min).keys()].map(v => v+min)

      // sections.push({min, max, range})
      return {min, max, range}
    })

    // return sections
  }, [])

  const overlaps = cleaningSectionPairs.filter(pair => itemOverlap(pair[0], pair[1]))
  const noOverlaps = cleaningSectionPairs.filter(pair => itemNoOverlap(pair[0], pair[1]))
  const someOverlap = cleaningSectionPairs.length - noOverlaps.length

  console.log(`Number of Fully overlapping sections are ${overlaps.length}`)
  console.log(`Number sections with some overlap is ${someOverlap}`)
 
}

part1n2() 