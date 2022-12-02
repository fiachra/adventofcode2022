const fs = require('fs')
const path = require('path')

const filename = 'day01Input.txt'
const filepath = path.join(__dirname, filename)

function main() {
  const file = fs.readFileSync(filepath, 'utf8')
  const caloriesPerElfStrings = file.split('\n\n')
  const caloriesPerEflSum = caloriesPerElfStrings.map(v => v.split('\n').map(v => Number(v)).reduce((a,v) => a+v, 0))
  const bestElfCalories =  Math.max(...caloriesPerEflSum)
  const bestElfNumber = caloriesPerEflSum.indexOf(bestElfCalories);

  console.log(`Elf ${bestElfNumber} has ${bestElfCalories} Calories`); 

  const sortedElfCalories = caloriesPerEflSum.sort((a,b) => b-a)
  const topThreeElves = sortedElfCalories.slice(0, 3)
  const topThreeSum = topThreeElves.reduce((a,n) => a+n, 0)

  console.log(`Top Three Elves have ${topThreeSum} Calories`)
}

main()