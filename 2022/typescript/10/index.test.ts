import * as fs from 'fs'
import { part1, part2 } from '.'

const sampleInput = fs.readFileSync('./10/sample.txt', 'utf8')
const puzzleInput = fs.readFileSync('./10/input.txt', 'utf8')

describe('part1', () => {
  test('sample', () => {
    const output = part1(sampleInput)

    expect(output).toBe(13140)
  })

  test('puzzle', () => {
    const output = part1(puzzleInput)

    expect(output).toBe(15360)
  })
})

describe('part2', () => {
  test('sample', () => {
    const expectedOuput =
`##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`
    const output = part2(sampleInput)

    expect(output).toBe(expectedOuput)
  })

  test('puzzle', () => {
    const expectedOuput =
`###..#..#.#....#..#...##..##..####..##..
#..#.#..#.#....#..#....#.#..#....#.#..#.
#..#.####.#....####....#.#......#..#..#.
###..#..#.#....#..#....#.#.##..#...####.
#....#..#.#....#..#.#..#.#..#.#....#..#.
#....#..#.####.#..#..##...###.####.#..#.`
    const output = part2(puzzleInput)

    expect(output).toBe(expectedOuput)
  })
})