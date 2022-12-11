interface Monkey {
  itemsWorryLevel: number[]
  operation: (item: number) => number
  test: (item: number) => number,
  divisor: number
}

export function parseInput(input: string): Monkey[] {
  return input.split('\n\n').map(monkeyNote => {
    // Parse the monkey note
    // Monkey 0:
    // Starting items: 79, 98
    // Operation: new = old * 19
    // Test: divisible by 23
    //   If true: throw to monkey 2
    //   If false: throw to monkey 3
    const lines = monkeyNote.split('\n')
    const itemsWorryLevel = lines[1].split(': ')[1].split(', ').map(Number)
    const [operator, operationValue] = lines[2].split(' new = old ')[1].split(' ')
    const testDivisibleByValue = +lines[3].split('divisible by ')[1]
    const testTrueReturn = +lines[4].split(' throw to monkey ')[1]
    const testFalseReturn = +lines[5].split(' throw to monkey ')[1]
    return {
      itemsWorryLevel,
      operation: (item) => {
        const rightHand = operationValue === 'old' ? item : +operationValue
        if (operator === '+') return item + rightHand
        if (operator === '*') return item * rightHand
        return item
      },
      test: (item) => {
        return item % testDivisibleByValue === 0 ? testTrueReturn : testFalseReturn
      },
      divisor: testDivisibleByValue
    }
  })
}

function top2MonkeyActivities(monkeyActivity: number[]): number {
  return monkeyActivity
    .sort((a, b) => a - b)
    .slice(-2)
    .reduce((a, b) => a * b)
}

function runRounds(monkeyState: Monkey[], monkeyActivity: number[], rounds: number, worryHandler: (worry: number) => number): number[] {
  let round = 0
  while (round < rounds) {
    round++
    monkeyState.map((monkey, i) => {
      let item = monkey.itemsWorryLevel.shift()
      while (item) {
        const worryLevel = monkey.operation(item)
        const newWorryLevel = worryHandler(worryLevel)
        const monkeyIndexToReceiveItem = monkey.test(newWorryLevel)
        monkeyActivity[i]++
        monkeyState[monkeyIndexToReceiveItem].itemsWorryLevel.push(newWorryLevel)
        item = monkey.itemsWorryLevel.shift()
      }
    })
  }
  return monkeyActivity
}

export function part1(input: string): number {
  const monkeyState = parseInput(input)
  const monkeyActivity = Array.from({ length: monkeyState.length }, () => 0)

  runRounds(monkeyState, monkeyActivity, 20, (worry) => Math.floor(worry / 3))
  // Find top 2 monkey activities and multiply them
  return top2MonkeyActivities(monkeyActivity)
}

export function part2(input: string): number {
  const monkeyState = parseInput(input)
  const monkeyActivity = Array.from({ length: monkeyState.length }, () => 0)

  const base = monkeyState.reduce((prev, monkey) => prev * monkey.divisor, 1);
  runRounds(monkeyState, monkeyActivity, 10000, (worry) => worry % base)

  // Find top 2 monkey activities and multiply them
  return top2MonkeyActivities(monkeyActivity)

}
