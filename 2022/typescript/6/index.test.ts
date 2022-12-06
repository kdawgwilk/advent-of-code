import * as fs from 'fs'
import { part1, part2 } from '.'

const sampleInput = fs.readFileSync('./6/sample.txt', 'utf8')
const puzzleInput = fs.readFileSync('./6/input.txt', 'utf8')

describe('part1', () => {
  test('sample 1', () => {
    const output = part1('mjqjpqmgbljsphdztnvjfqwrcgsmlb')

    expect(output).toBe(7)
  })

  test('sample 2', () => {
    const output = part1('bvwbjplbgvbhsrlpgdmjqwftvncz')

    expect(output).toBe(5)
  })

  test('sample 3', () => {
    const output = part1('nppdvjthqldpwncqszvftbrmjlhg')

    expect(output).toBe(6)
  })

  test('sample 4', () => {
    const output = part1('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')

    expect(output).toBe(10)
  })

  test('sample 4', () => {
    const output = part1('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')

    expect(output).toBe(11)
  })

  test('puzzle', () => {
    const output = part1(puzzleInput)

    expect(output).toBe(1804)
  })
})

describe('part2', () => {
  test('sample 1', () => {
    const output = part2('mjqjpqmgbljsphdztnvjfqwrcgsmlb')

    expect(output).toBe(19)
  })

  test('sample 2', () => {
    const output = part2('bvwbjplbgvbhsrlpgdmjqwftvncz')

    expect(output).toBe(23)
  })

  test('sample 3', () => {
    const output = part2('nppdvjthqldpwncqszvftbrmjlhg')

    expect(output).toBe(23)
  })

  test('sample 4', () => {
    const output = part2('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')

    expect(output).toBe(29)
  })

  test('sample 5', () => {
    const output = part2('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')

    expect(output).toBe(26)
  })

  test('puzzle', () => {
    const output = part2(puzzleInput)

    expect(output).toBe(2508)
  })
})