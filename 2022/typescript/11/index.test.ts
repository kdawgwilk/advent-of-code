import * as fs from 'fs'
import { parseInput, part1, part2 } from '.'

const sampleInput = fs.readFileSync('./11/sample.txt', 'utf8')
const puzzleInput = fs.readFileSync('./11/input.txt', 'utf8')

describe('parseInput', () => {
  test('parse input to correct monkeyState', () => {
    const input =
`Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3`

    const output = parseInput(input)

    expect(output[0].itemsWorryLevel).toEqual([79, 98])
    expect(output[0].operation(79)).toEqual(1501)
    expect(output[0].test(500)).toEqual(3)

    expect(output[1].itemsWorryLevel).toEqual([54, 65, 75, 74])
    expect(output[1].operation(1)).toEqual(7)
    expect(output[1].test(18)).toEqual(0)

    expect(output[2].itemsWorryLevel).toEqual([79, 60, 97])
    expect(output[2].operation(79)).toEqual(6241)
    expect(output[2].test(2080)).toEqual(1)
  })
})

describe('part1', () => {
  test('sample', () => {
    const output = part1(sampleInput)

    expect(output).toBe(10605)
  })

  test('puzzle', () => {
    const output = part1(puzzleInput)

    expect(output).toBe(58794)
  })
})

describe('part2', () => {
  test('sample', () => {
    const output = part2(sampleInput)

    expect(output).toBe(2713310158)
  })

  test('puzzle', () => {
    const output = part2(puzzleInput)

    expect(output).toBe(20151213744)
  })
})