import * as fs from 'fs'
import { a, b } from '.'

const sampleInput = fs.readFileSync('./template/sample.txt', 'utf8')
const puzzleInput = fs.readFileSync('./template/input.txt', 'utf8')

describe('a', () => {
  test('sample', () => {
    const output = a(sampleInput)

    // expect(output).toBe(1)
  })

  test('puzzle', () => {
    const output = a(puzzleInput)

    console.log('answer: ', output)
    // expect(output).toBe(1)
  })
})

describe('b', () => {
  test('sample', () => {
    const output = b(sampleInput)

    // expect(output).toBe(1)
  })

  test('puzzle', () => {
    const output = b(puzzleInput)

    console.log('answer: ', output)
    // expect(output).toBe(1)
  })
})