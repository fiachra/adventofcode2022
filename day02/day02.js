const fs = require('fs')
const path = require('path')

const plays = ['Rock', 'Paper', 'Sissors']
const playScores = [1,2,3]
const resultScores = [0, 3, 6]
const resultsArray = [[0,-1,1],[1,0,-1],[-1,1,0]]
const aCode = 65
const xCode = 88

const filename = 'day2Input.txt'
const filepath = path.join(__dirname, filename)

function getValsForInputs([a, b]) {
  const aVal = a && a.charCodeAt(0) - aCode
  const bVal = b && b.charCodeAt(0) - xCode

  return [aVal, bVal]
}

function battle(p1, p2) {
  const p1Result = resultsArray[p1][p2]
  const p2Result = p1Result*-1

  const p1Score = playScores[p1] + resultScores[p1Result+1]
  const p2Score = playScores[p2] + resultScores[p2Result+1]

  return { p1Score, p2Score }
}

function getPlayForResult(p1, result) {

  const desiredResultVal =  ((result.charCodeAt(0) - xCode) - 1)
  const pl2Plays = resultsArray[p1].indexOf(desiredResultVal*-1)
  // console.log(`P1 plays ${plays[p1]} and we want ${desiredResultVal} so P2 plays ${plays[pl2Plays]}`)
  return pl2Plays

}

function d2p1() {
  const file = fs.readFileSync(filepath, 'utf8')
  const results = file.split('\n').map(v => {
    const [pl1, pl2] = getValsForInputs(v.split(' '))
    
    return battle(pl1, pl2)
  })

  const p2Total = results.reduce((a,v) => a+v.p2Score, 0)

  console.log(`Rock Paper Sissors results for part one: ${p2Total}`)
}

function d2p2() {
  const file = fs.readFileSync(filepath, 'utf8')
  const results = file.split('\n').map(v => {
    const [p1, result] = v.split(' ')
    const [pl1] = getValsForInputs([p1])
    
    const pl2 = getPlayForResult(pl1, result)
    return battle(pl1, pl2)
  })

  const p2Total = results.reduce((a,v) => a+v.p2Score, 0)


  console.log(`Rock Paper Sissors results for part two: ${p2Total}`)
}


d2p1()
d2p2()
