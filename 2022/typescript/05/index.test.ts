import * as fs from 'fs'
import {
  parseCrateStateRow,
  crateStateFromDrawing,
  crateStateToDrawing,
  parseRearrangementProcedures,
  applyRearrangementProcedure9000,
  applyRearrangementProcedure9001,
  part1,
  part2
} from '.'

const sampleInput = fs.readFileSync('./5/sample.txt', 'utf8')
const puzzleInput = fs.readFileSync('./5/input.txt', 'utf8')

describe('parseCrateStateRow', () => {
  it('parses a full row of crates', () => {
    expect(parseCrateStateRow('[A] [B] [C]')).toEqual(['A', 'B', 'C'])
  })

  it('parses a row of crates missing first crate', () => {
    expect(parseCrateStateRow('    [B] [C]')).toEqual([null, 'B', 'C'])
  })

  it('parses a row of crates missing last crate', () => {
    expect(parseCrateStateRow('[A] [B]    ')).toEqual(['A', 'B', null])
  })
})

describe('crateStateFromDrawing', () => {
  const drawing = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 `

  it('parses the sample input', () => {
    const expectedCrateState = [
      ['Z', 'N'],
      ['M', 'C', 'D'],
      ['P'],
    ]
    const crateState = crateStateFromDrawing(drawing)
    expect(crateState).toEqual(expectedCrateState)
  })
})

describe('crateStateToDrawing', () => {
  const crateState = [
    ['Z', 'N'],
    ['M', 'C', 'D'],
    ['P'],
  ]
  it('outputs correctly formatted drawing from crateState', () => {
    const expectedDrawing = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 `
    const drawing = crateStateToDrawing(crateState)
    expect(drawing).toEqual(expectedDrawing)
  })
})

describe('parseRearrangementProcedures', () => {
  it('parses the sample input', () => {
    const input = 'move 1 from 2 to 1'
    const expectedRearrangementProcedures = [
      {
        quantity: 1,
        fromStack: 2,
        toStack: 1,
      }
    ]
    const rearrangementProcedures = parseRearrangementProcedures(input)
    expect(rearrangementProcedures).toEqual(expectedRearrangementProcedures)
  })
})

describe('applyRearrangementProcedure9000', () => {
  it('moves 2 crates from one stack to another', () => {
    const crateState = [
      ['Z', 'N'],
      ['M', 'C', 'D'],
      ['P'],
    ]
    const expectedCrateState = [
      ['Z', 'N', 'D', 'C'],
      ['M'],
      ['P'],
    ]
    const rearrangementProcedure = {
      quantity: 2,
      fromStack: 2,
      toStack: 1,
    }
    const newCrateState = applyRearrangementProcedure9000(crateState, rearrangementProcedure)
    expect(newCrateState).toEqual(expectedCrateState)
  })
})

describe('applyRearrangementProcedure9001', () => {
  it('moves 2 crates from one stack to another', () => {
    const crateState = [
      ['Z', 'N'],
      ['M', 'C', 'D'],
      ['P'],
    ]
    const expectedCrateState = [
      ['Z', 'N', 'C', 'D'],
      ['M'],
      ['P'],
    ]
    const rearrangementProcedure = {
      quantity: 2,
      fromStack: 2,
      toStack: 1,
    }
    const newCrateState = applyRearrangementProcedure9001(crateState, rearrangementProcedure)
    expect(newCrateState).toEqual(expectedCrateState)
  })
})

describe('part1', () => {
  test('sample', () => {
    const output = part1(sampleInput)

    expect(output).toBe('CMZ')
  })

  test('puzzle', () => {
    const output = part1(puzzleInput)

    expect(output).toBe('HBTMTBSDC')
  })
})

describe('part2', () => {
  test('sample', () => {
    const output = part2(sampleInput)

    expect(output).toBe('MCD')
  })

  test('puzzle', () => {
    const output = part2(puzzleInput)

    expect(output).toBe('PQTJRSHWS')
  })
})