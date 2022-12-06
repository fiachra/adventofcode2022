const fs = require('fs')
const path = require('path')
const { mainModule } = require('process')

const filename = 'input02.txt'
const filepath = path.join(__dirname, filename)

function printMarkerCompare(signalArray, markerLength, packet, pos) {
  console.log(`${signalArray.join('')}`)
  console.log(`${' '.repeat((pos-markerLength))}${packet.join('')}  ${pos}`)
}

function getSOPMarker(signalArray, markerLength) {
  const packet = signalArray.slice(0, markerLength)
  let pos = markerLength

  // printMarkerCompare(signalArray, markerLength, packet, pos)

  while (packet.some(v => packet.indexOf(v) !== packet.lastIndexOf(v)) && pos < signalArray.length) {
    pos++
    packet.push(signalArray[pos-1])
    packet.shift()
    // printMarkerCompare(signalArray, markerLength, packet, pos)
  }

  console.log(`Marker position for marker of length ${markerLength} is ${pos}`)
  return pos

 
}

function part1() {
  const file = fs.readFileSync(filepath, 'utf8')
  const signals = file.split('\n').map(v => v.split(''))
  const sopPositions4 = signals.map(v => getSOPMarker(v, 4))
  const sopPositions17 = signals.map(v => getSOPMarker(v, 14))

}

part1() 