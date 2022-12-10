export enum Direction {
  UP = 'U',
  DOWN = 'D',
  LEFT = 'L',
  RIGHT = 'R',
}

export interface Move {
  direction: Direction
  distance: number
}

export interface Position {
  x: number
  y: number
}

export function movePosition(position: Position, direction: Direction) {
  switch (direction) {
    case Direction.UP:
      position.y++
      break
    case Direction.DOWN:
      position.y--
      break
    case Direction.LEFT:
      position.x--
      break
    case Direction.RIGHT:
      position.x++
      break
  }
}

function calcPointsTouching(a: Position, b: Position): boolean {
  return (Math.abs(a.x - b.x) <= 1) && (Math.abs(a.y - b.y) <= 1)
}

export function followPosition(head: Position, tail: Position): boolean {
  const isTailTouchingHead = calcPointsTouching(head, tail)
  if (isTailTouchingHead) {
    // console.log('tail is touching head', head, tail)
    return false
  }
  
  if (head.x > tail.x) {
    movePosition(tail, Direction.RIGHT)
  }
  if (head.x < tail.x) {
    movePosition(tail, Direction.LEFT)
  }
  if (head.y > tail.y) {
    movePosition(tail, Direction.UP)
  }
  if (head.y < tail.y) {
    movePosition(tail, Direction.DOWN)
  }
  return true
}

function parseInput(input: string): Move[] {
  return input.split('\n').map((line): Move => {
    const [directionInput, distanceInput] = line.split(' ')
    const distance = Number(distanceInput)
    switch (directionInput) {
      case 'U':
        return { direction: Direction.UP, distance }
      case 'D':
        return { direction: Direction.DOWN, distance }
      case 'L':
        return { direction: Direction.LEFT, distance }
      case 'R':
        return { direction: Direction.RIGHT, distance }
      default:
        throw new Error(`Unknown direction: ${directionInput}`)
    }
  })
}

export function part1(input: string): number {
  const moves = parseInput(input)

  const headPosition: Position = { x: 0, y: 0 }
  const tailPosition: Position = { x: 0, y: 0 }
  const visitedPositions = new Set<string>(['0,0'])

  moves.forEach(move => {
    for (let i = 1; i <= move.distance; i++) {
      movePosition(headPosition, move.direction)
      const tailMoved = followPosition(headPosition, tailPosition)
      if (tailMoved) {
        visitedPositions.add(`${tailPosition.x},${tailPosition.y}`)
      }
    }
  })

  return visitedPositions.size
}

export function part2(input: string): number {
  const moves = parseInput(input)

  const headPosition: Position = { x: 0, y: 0 }
  const knotPositions: Position[] = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]
  const visitedPositions = new Set<string>(['0,0'])

  moves.forEach(move => {
    for (let i = 1; i <= move.distance; i++) {
      movePosition(headPosition, move.direction)
      knotPositions.forEach((knotPosition, i)=> {
        const positionToFollow = knotPositions[i - 1] || headPosition
        const isTail = i === 8
        const knotMoved = followPosition(positionToFollow, knotPosition)
        if (knotMoved && isTail) {
          visitedPositions.add(`${knotPosition.x},${knotPosition.y}`)
        }
      })
    }
  })

  return visitedPositions.size
}
