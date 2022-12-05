const fs = require('fs')
const path = require('path')
const { mainModule } = require('process')

const filename = 'input02.txt'
const filepath = path.join(__dirname, filename)

function runInstructionsP1(stacks , inst) {

  inst.forEach(ins => {
    const [count, from, to] = ins

    for (let i = 0; i < count; i++) {
      const mover = stacks[from-1].shift()
      stacks[to-1].unshift(mover)
    }
  })

  return stacks
}


function runInstructionsP2(stacks , inst) {

  inst.forEach(ins => {
    const [count, from, to] = ins
    const move = stacks[from-1].splice(0, count)
    stacks[to-1].unshift(...move)
  })

  return stacks
}

function parseInstructions(instructions) {
  const regex = new RegExp(/move (\d+) from (\d+) to (\d+)/i)

  return instructions.map(ins => {
    const [,numActions, from, to] = ins.match(regex)
    return [numActions, from, to].map(Number)
  })
}

function parseStacks(stacks) {
  const charLength = stacks[0].length
  const numStacks = Math.floor((charLength+1)/4)
  const regex = new RegExp(/\[.\]/g)

  const res = new Array(numStacks).fill(null).map(v => []);
  return stacks.reduce((accum,row) => {
    const res = row.matchAll(regex)
    for(const m of res) {
      const stackIndex = m.index/4
      accum[stackIndex].push(m[0].charAt(1))
    }
    
    return accum
  }, res)
}

function parseInput(lines) {
  const firstInstruction = lines.find(v => v.startsWith('move'))
  const instrIndex = lines.indexOf(firstInstruction)  
  const stacks = lines.slice(0, instrIndex-2)
  const instructions = lines.slice(instrIndex)

  return {stacks, instructions}
}
function part1() {
  const file = fs.readFileSync(filepath, 'utf8')
  const lines = file.split('\n')
  const {stacks, instructions} = parseInput(lines)

  const ins = parseInstructions(instructions)
  const stk = parseStacks(stacks)

  runInstructionsP1(stk, ins)

  console.log(`Top Crates after part 1 are ${stk.map(v => `${v[0]}`).join('')}`)
 
}

function part2() {
  const file = fs.readFileSync(filepath, 'utf8')
  const lines = file.split('\n')
  const {stacks, instructions} = parseInput(lines)

  const ins = parseInstructions(instructions)
  const stk = parseStacks(stacks)

  runInstructionsP2(stk, ins)

  console.log(`Top Crates after part 2 are ${stk.map(v => `${v[0]}`).join('')}`)
 
}


part2() 