
export function part1(input: string): number {
  const markerLength = 4
  for (let i = 0; i < input.length; i++) {
    const markerSequence = input.slice(i, i + markerLength)
    // check sequence characters are unique
    if (new Set(markerSequence).size === markerLength) {
      return i + markerLength
    }
  }
  return 0
}

export function part2(input: string): number {
  const markerLength = 14
  for (let i = 0; i < input.length; i++) {
    const markerSequence = input.slice(i, i + markerLength)
    // check sequence characters are unique
    if (new Set(markerSequence).size === markerLength) {
      return i + markerLength
    }
  }
  return 0
}
