
type CrateState = Array<Array<string | null>>

interface RearrangementProcedure {
  quantity: number
  fromStack: number
  toStack: number
}

export function parseCrateStateRow(crateStateRow: string): Array<string | null> {
  const numberOfStacks = (crateStateRow.length + 1) / 4
  const crateStateRowArray = Array.from({ length: numberOfStacks }, (_, i) => {
    const crateStartIndex = i * 4
    const crate = crateStateRow.slice(crateStartIndex, crateStartIndex + 3)
    return crate === '   ' ? null : crate.slice(1, 2)
  })
  return crateStateRowArray
}

/**
 * Parse the crate state from the input
 * 
 * Example crateDrawing:
 * 
 *     [D]    
 * [N] [C]    
 * [Z] [M] [P]
 *  1   2   3 
 * 
 * Returns:
 * 
 * [
 *   ['Z', 'N'],
 *   ['M', 'C', 'D'],
 *   ['P'],
 * ]
 * 
 * 
 * @param {string} crateDrawing 
 * @returns {CrateState}
 */
export function crateStateFromDrawing(crateDrawing: string): CrateState {
  const crateState: CrateState = []
  const rows = crateDrawing.split('\n')
  rows.pop()
  const parsedRows = rows.map(parseCrateStateRow).reverse()
  parsedRows.map(row => {
    row.map((crate, i) => {
      if (crateState[i] && crate) {
        crateState[i].push(crate)
      } else if (crate) {
        crateState[i] = [crate]
      }
    })
  })
  return crateState
}

export function crateStateToDrawing(crateState: CrateState): string {
  const maxStackLength = Math.max(...crateState.map(stack => stack.length))
  const numberOfStacks = crateState.length
  const rows: string[] = []
  for (let i = 0; i < maxStackLength; i++) {
    let row: string[] = []
    for (let j = 0; j < numberOfStacks; j++) {
      const crate = crateState[j][i]
      if (crate) {
        row.push(`[${crate}]`)
      } else {
        row.push('   ')
      }
    }
    rows.push(row.join(' '))
  }

  rows.reverse()
  const stackLabels = crateState.map((_, i) => ` ${i + 1} `).join(' ')
  rows.push(stackLabels)
  return rows.join('\n')
}

function parseRearrangementProcedure(rearrangementProcedure: string): RearrangementProcedure {
  // move 1 from 2 to 1
  const [_, quantity, fromStack, toStack] = rearrangementProcedure.match(/move (\d+) from (\d+) to (\d+)/)!
  return {
    quantity: Number(quantity),
    fromStack: Number(fromStack),
    toStack: Number(toStack),
  }
}

export function parseRearrangementProcedures(rearrangementProcedures: string): Array<RearrangementProcedure> {
  return rearrangementProcedures.split('\n').map(rearrangementProcedure => {
    return parseRearrangementProcedure(rearrangementProcedure)
  })
}

export function applyRearrangementProcedure9000(crateState: CrateState, rearrangementProcedure: RearrangementProcedure): CrateState {
  const { quantity, fromStack, toStack } = rearrangementProcedure
  const fromStackIndex = fromStack - 1
  const toStackIndex = toStack - 1

  // Moves creates one at a time
  for (let i = 1; i <= quantity; i++) {
    const crate = crateState[fromStackIndex].pop()
    crateState[toStackIndex].push(crate!)
  }

  return crateState
}

export function applyRearrangementProcedure9001(crateState: CrateState, rearrangementProcedure: RearrangementProcedure): CrateState {
  const { quantity, fromStack, toStack } = rearrangementProcedure
  const fromStackIndex = fromStack - 1
  const toStackIndex = toStack - 1

  // Moves creates together
  const cratesToMove = crateState[fromStackIndex].splice(-quantity)
  crateState[toStackIndex].push(...cratesToMove)

  return crateState
}

function topCrates(crateState: CrateState): string {
  return crateState.map(stack => stack[stack.length - 1]).join('')
}

export function part1(input: string): string {
  const [crateDrawing, rearrangementProceduresInput] = input.split('\n\n')
  const crateState = crateStateFromDrawing(crateDrawing)

  const rearrangementProcedures = parseRearrangementProcedures(rearrangementProceduresInput)

  rearrangementProcedures.map(rearrangementProcedure => {
    applyRearrangementProcedure9000(crateState, rearrangementProcedure)
  })

  return topCrates(crateState)
}

export function part2(input: string): string {
  const [crateDrawing, rearrangementProceduresInput] = input.split('\n\n')
  const crateState = crateStateFromDrawing(crateDrawing)

  const rearrangementProcedures = parseRearrangementProcedures(rearrangementProceduresInput)

  rearrangementProcedures.map(rearrangementProcedure => {
    applyRearrangementProcedure9001(crateState, rearrangementProcedure)
  })

  return topCrates(crateState)
}
