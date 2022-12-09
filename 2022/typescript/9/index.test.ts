import * as fs from 'fs'
import { movePosition, followPosition, part1, part2, Direction } from '.'

const sampleInput = fs.readFileSync('./9/sample1.txt', 'utf8')
const sample2Input = fs.readFileSync('./9/sample2.txt', 'utf8')
const puzzleInput = fs.readFileSync('./9/input.txt', 'utf8')

describe('movePosition', () => {
  it('should move up', () => {
    const position = { x: 0, y: 0 }
    const expectedPosition = { x: 0, y: 1 }

    movePosition(position, Direction.UP)
    expect(position).toEqual(expectedPosition)
  })

  it('should move down', () => {
    const position = { x: 0, y: 0 }
    const expectedPosition = { x: 0, y: -1 }

    movePosition(position, Direction.DOWN)
    expect(position).toEqual(expectedPosition)
  })

  it('should move left', () => {
    const position = { x: 0, y: 0 }
    const expectedPosition = { x: -1, y: 0 }

    movePosition(position, Direction.LEFT)
    expect(position).toEqual(expectedPosition)
  })

  it('should move right', () => {
    const position = { x: 0, y: 0 }
    const expectedPosition = { x: 1, y: 0 }

    movePosition(position, Direction.RIGHT)
    expect(position).toEqual(expectedPosition)
  })
})

describe('followPosition', () => {
  it('should follow horizontal position', () => {
    const headPosition = { x: 2, y: 0 }
    const tailPosition = { x: 0, y: 0 }
    const expectedTailPosition = { x: 1, y: 0 }

    followPosition(headPosition, tailPosition)
    expect(tailPosition).toEqual(expectedTailPosition)
  })

  it('should follow vertical position', () => {
    const headPosition = { x: 0, y: 2 }
    const tailPosition = { x: 0, y: 0 }
    const expectedTailPosition = { x: 0, y: 1 }

    followPosition(headPosition, tailPosition)
    expect(tailPosition).toEqual(expectedTailPosition)
  })

  it('should not move if overlapping', () => {
    const headPosition = { x: 0, y: 0 }
    const tailPosition = { x: 0, y: 0 }
    const expectedTailPosition = { x: 0, y: 0 }

    followPosition(headPosition, tailPosition)
    expect(tailPosition).toEqual(expectedTailPosition)
  })

  it('should not move if touching in horizontal direction', () => {
    const headPosition = { x: 1, y: 0 }
    const tailPosition = { x: 0, y: 0 }
    const expectedTailPosition = { x: 0, y: 0 }

    followPosition(headPosition, tailPosition)
    expect(tailPosition).toEqual(expectedTailPosition)
  })

  it('should not move if touching in vertical direction', () => {
    const headPosition = { x: 0, y: 1 }
    const tailPosition = { x: 0, y: 0 }
    const expectedTailPosition = { x: 0, y: 0 }

    followPosition(headPosition, tailPosition)
    expect(tailPosition).toEqual(expectedTailPosition)
  })

  it('should not move if touching in diagonal direction', () => {
    const headPosition = { x: 1, y: 1 }
    const tailPosition = { x: 0, y: 0 }
    const expectedTailPosition = { x: 0, y: 0 }

    followPosition(headPosition, tailPosition)
    expect(tailPosition).toEqual(expectedTailPosition)
  })
})

describe('part1', () => {
  test('sample', () => {
    const output = part1(sampleInput)

    expect(output).toBe(13)
  })

  test('puzzle', () => {
    const output = part1(puzzleInput)

    expect(output).toBe(5710)
  })
})

fdescribe('part2', () => {
  test('sample', () => {
    const output = part2(sample2Input)

    expect(output).toBe(36)
  })

  test('puzzle', () => {
    const output = part2(puzzleInput)

    expect(output).toBe(2259)
  })
})