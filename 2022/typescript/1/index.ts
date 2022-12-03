declare global {
  interface Array<T> {
    log(label?: string): Array<T>
  }
}

Array.prototype.log = function (label?: string) {
  console.log(label, this)
  return this
}

export function part1(input: string): number {
  const calorieCounts = input
    .split('\n\n')
    .map(line =>
      line
        .split('\n')
        .map(calories => Number(calories))
        .reduce((a, b) => a + b, 0)
    )
  const maxCalories = Math.max(...calorieCounts)
  return maxCalories
}

export function part2(input: string): number {
  const maxCalories = input
    .split('\n\n')
    .map(line =>
      line
        .split('\n')
        .map(calories => Number(calories))
        .reduce((a, b) => a + b, 0)
    )
    .sort((a, b) => b - a)
    .slice(0,3)
    .reduce((a, b) => a + b, 0)
  return maxCalories
}
