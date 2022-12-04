import * as fs from 'fs'
import { part1, part2 } from '.'

const sampleInput = fs.readFileSync('./4/sample.txt', 'utf8')
const puzzleInput = fs.readFileSync('./4/input.txt', 'utf8')

describe('part1', () => {
  test('sample', () => {
    const output = part1(sampleInput)

    expect(output).toBe(2)
  })

  test('puzzle', () => {
    const output = part1(puzzleInput)

    expect(output).toBe(441)
  })
})

describe('part2', () => {
  test('sample', () => {
    const output = part2(sampleInput)

    expect(output).toBe(4)
  })

  test('puzzle', () => {
    const output = part2(puzzleInput)

    expect(output).toBe(861)
  })
})