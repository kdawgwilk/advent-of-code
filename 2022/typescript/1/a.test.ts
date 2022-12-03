import * as fs from 'fs'
import { main } from "./a"

test('sample', () => {
  const sampleInput = fs.readFileSync('./1/sample.txt', 'utf8')

  const output = main(sampleInput)

  expect(output).toBe(24000)
})

test('puzzle', () => {
  const puzzleInput = fs.readFileSync('./1/input.txt', 'utf8')
  const output = main(puzzleInput)

  console.log('answer: ', output)
  expect(output).toBe(67450)
})
