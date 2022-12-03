import * as fs from 'fs'
import { a, b } from '.'

const sampleInput = fs.readFileSync('./1/sample.txt', 'utf8')
const puzzleInput = fs.readFileSync('./1/input.txt', 'utf8')

describe('a', () => {
  test('sample', () => {
    const output = a(sampleInput)

    expect(output).toBe(24000)
  })

  test('puzzle', () => {
    const output = a(puzzleInput)

    console.log('answer: ', output)
    expect(output).toBe(67450)
  })
})

describe('b', () => {
  test('sample', () => {  
    const output = b(sampleInput)
  
    expect(output).toBe(45000)
  })
  
  test('puzzle', () => {
    const output = b(puzzleInput)
  
    console.log('answer: ', output)
    expect(output).not.toBe(38288)
    expect(output).toBe(199357)
  })
})