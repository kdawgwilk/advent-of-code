import * as fs from 'fs'
import { part1, part2 } from '.'

const sampleInput = fs.readFileSync('./2/sample.txt', 'utf8')
const puzzleInput = fs.readFileSync('./2/input.txt', 'utf8')

describe('part1', () => {
  test('sample', () => {
    const output = part1(sampleInput)

    expect(output).toBe(15)
  })

  test('puzzle', () => {
    const output = part1(puzzleInput)

    expect(output).toBe(14163)
  })
})

describe('part2', () => {
  test('sample', () => {
    const output = part2(sampleInput)

    expect(output).toBe(12)
  })

  test('puzzle', () => {
    const output = part2(puzzleInput)

    expect(output).not.toBe(9539)
    expect(output).toBeGreaterThan(9539)
    expect(output).toBe(12091)
  })
})