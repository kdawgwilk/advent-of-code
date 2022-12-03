import * as fs from 'fs'
import { main } from "./b"

test('sample', () => {
  const sampleInput = fs.readFileSync('./1/sample.txt', 'utf8')

  const output = main(sampleInput)

  expect(output).toBe(45000)
})

test('puzzle', () => {
  const puzzleInput = fs.readFileSync('./1/input.txt', 'utf8')
  const output = main(puzzleInput)

  console.log('answer: ', output)
  expect(output).not.toBe(38288)
  expect(output).toBe(199357)
})
