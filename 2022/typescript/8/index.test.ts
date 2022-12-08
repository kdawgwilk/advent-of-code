import * as fs from 'fs'
import { visibleTrees, part1, part2 } from '.'

const sampleInput = fs.readFileSync('./8/sample.txt', 'utf8')
const puzzleInput = fs.readFileSync('./8/input.txt', 'utf8')

describe('visibleTrees', () => {
  test('creates list of visible trees', () => {
    const output = visibleTrees([3, 0, 3, 7, 3])

    expect(output).toEqual([true, false, false, true, true])
  })
})

describe('part1', () => {
  test('sample', () => {
    const output = part1(sampleInput)

    expect(output).toBe(21)
  })

  test('puzzle', () => {
    const output = part1(puzzleInput)

    expect(output).not.toBe(1818)
    expect(output).toBe(1693)
  })
})

describe('part2', () => {
  test('sample', () => {
    const output = part2(sampleInput)

    expect(output).toBe(8)
  })

  test('puzzle', () => {
    const output = part2(puzzleInput)

    expect(output).not.toBe(125)
    expect(output).toBe(422059)
  })
})