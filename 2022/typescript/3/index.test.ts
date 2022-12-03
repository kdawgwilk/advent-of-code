import * as fs from 'fs'
import { part1, part2 } from '.'

const sampleInput = fs.readFileSync('./3/sample.txt', 'utf8')
const puzzleInput = fs.readFileSync('./3/input.txt', 'utf8')

describe('part1', () => {
  test('sample', () => {
    const output = part1(sampleInput)

    expect(output).toBe(157)
  })

  test('puzzle', () => {
    const output = part1(puzzleInput)

    expect(output).toBe(8018)
  })
})

describe('part2', () => {
  test('sample', () => {
    const output = part2(sampleInput)

    expect(output).toBe(70)
  })

  test('puzzle', () => {
    const output = part2(puzzleInput)

    expect(output).toBe(2518)
  })
})