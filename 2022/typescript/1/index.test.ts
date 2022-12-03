import * as fs from 'fs'
import { part1, part2 } from '.'

const sampleInput = fs.readFileSync('./1/sample.txt', 'utf8')
const puzzleInput = fs.readFileSync('./1/input.txt', 'utf8')

describe('part1', () => {
  test('sample', () => {
    const output = part1(sampleInput)

    expect(output).toBe(24000)
  })

  test('puzzle', () => {
    const output = part1(puzzleInput)

    expect(output).toBe(67450)
  })
})

describe('part2', () => {
  test('sample', () => {  
    const output = part2(sampleInput)
  
    expect(output).toBe(45000)
  })
  
  test('puzzle', () => {
    const output = part2(puzzleInput)
  
    expect(output).not.toBe(38288)
    expect(output).toBe(199357)
  })
})