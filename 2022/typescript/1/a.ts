
export function main(input: string): number {
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
