import * as fs from 'fs'
import { a, b } from '.'

const sampleInput = fs.readFileSync('./3/sample.txt', 'utf8')
const puzzleInput = fs.readFileSync('./3/input.txt', 'utf8')

describe('a', () => {
  test('sample', () => {
    const output = a(sampleInput)

    expect(output).toBe(157)
  })

  test('puzzle', () => {
    const output = a(puzzleInput)

    expect(output).toBe(8018)
  })
})

fdescribe('b', () => {
  test('sample', () => {
    const output = b(sampleInput)

    expect(output).toBe(70)
  })

  test('puzzle', () => {
    const output = b(puzzleInput)

    expect(output).toBe(2518)
  })
})