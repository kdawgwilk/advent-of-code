import * as fs from 'fs'
import { a, b } from '.'

const sampleInput = fs.readFileSync('./2/sample.txt', 'utf8')
const puzzleInput = fs.readFileSync('./2/input.txt', 'utf8')

describe('a', () => {
  test('sample', () => {
    const output = a(sampleInput)

    expect(output).toBe(15)
  })

  test('puzzle', () => {
    const output = a(puzzleInput)

    expect(output).toBe(14163)
  })
})

describe('b', () => {
  test('sample', () => {
    const output = b(sampleInput)

    expect(output).toBe(12)
  })

  test('puzzle', () => {
    const output = b(puzzleInput)

    expect(output).not.toBe(9539)
    expect(output).toBeGreaterThan(9539)
    expect(output).toBe(12091)
  })
})