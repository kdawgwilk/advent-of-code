enum Move {
  ROCK = 1,
  PAPER = 2,
  SCISSORS = 3,
}

enum RoundOutome {
  WIN = 6,
  DRAW = 3,
  LOSS = 0
}

const selectScoreWithDesiredOutcome = {
  [Move.ROCK]: {
    [RoundOutome.DRAW]: Move.ROCK,
    [RoundOutome.WIN]: Move.PAPER,
    [RoundOutome.LOSS]: Move.SCISSORS,
  },
  [Move.PAPER]: {
    [RoundOutome.DRAW]: Move.PAPER,
    [RoundOutome.WIN]: Move.SCISSORS,
    [RoundOutome.LOSS]: Move.ROCK,
  },
  [Move.SCISSORS]: {
    [RoundOutome.DRAW]: Move.SCISSORS,
    [RoundOutome.WIN]: Move.ROCK,
    [RoundOutome.LOSS]: Move.PAPER,
  },
}

const moveMapper = {
  A: Move.ROCK,
  X: Move.ROCK,
  B: Move.PAPER,
  Y: Move.PAPER,
  C: Move.SCISSORS,
  Z: Move.SCISSORS,
}

const outcomeMapper = {
  X: RoundOutome.LOSS,
  Y: RoundOutome.DRAW,
  Z: RoundOutome.WIN,
}

type MoveInput = keyof typeof moveMapper

function roundOutcome(opponentMove: Move, myMove: Move): RoundOutome {
  if (opponentMove === myMove) {
    return RoundOutome.DRAW
  }

  switch (opponentMove) {
    case Move.ROCK:
      return myMove === Move.PAPER ? RoundOutome.WIN : RoundOutome.LOSS

    case Move.PAPER:
      return myMove === Move.SCISSORS ? RoundOutome.WIN : RoundOutome.LOSS
      
    case Move.SCISSORS:
      return myMove === Move.ROCK ? RoundOutome.WIN : RoundOutome.LOSS
  }
}

export function part1(input: string): number {
  return input.split('\n')
    .map(line => {
      const [opponentMove, myMove] = line.split(' ')
        .map((move) => moveMapper[move as MoveInput]) as [Move, Move]
      return roundOutcome(opponentMove, myMove) + myMove
    })
    .reduce((acc, round) => acc + round, 0)
}

export function part2(input: string): number {
  return input.split('\n')
    .map(line => {
      const [opponentMoveInput, outcomeInput] = line.split(' ') as ['A' | 'B' | 'C', 'X' | 'Y' | 'Z']
      const [opponentMove, outcome] = [moveMapper[opponentMoveInput], outcomeMapper[outcomeInput]]
      return outcome + selectScoreWithDesiredOutcome[opponentMove][outcome]
    })
    .reduce((acc, round) => acc + round, 0)
}
