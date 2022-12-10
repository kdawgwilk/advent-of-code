function findMarker(input: string, markerLength: number): number {
  for (let i = 0; i < input.length; i++) {
    const markerSequence = input.slice(i, i + markerLength)
    // check sequence characters are unique
    if (new Set(markerSequence).size === markerLength) {
      return i + markerLength
    }
  }
  throw new Error('No marker found')
}

export function part1(input: string): number {
  return findMarker(input, 4)
}

export function part2(input: string): number {
  return findMarker(input, 14)

}
