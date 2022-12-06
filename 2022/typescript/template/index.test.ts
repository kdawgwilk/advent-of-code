import * as fs from 'fs'
import { part1, part2 } from '.'

const sampleInput = fs.readFileSync('./template/sample.txt', 'utf8')
const puzzleInput = fs.readFileSync('./template/input.txt', 'utf8')

fdescribe('part1', () => {
  test('sample', () => {
    const output = part1(sampleInput)

    // expect(output).toBe(1)
  })

  xtest('puzzle', () => {
    const output = part1(puzzleInput)

    console.log('answer: ', output)
    // expect(output).toBe(1)
  })
})

describe('part2', () => {
  test('sample', () => {
    const output = part2(sampleInput)

    // expect(output).toBe(1)
  })

  xtest('puzzle', () => {
    const output = part2(puzzleInput)

    console.log('answer: ', output)
    // expect(output).toBe(1)
  })
})