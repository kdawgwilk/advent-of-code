
interface Command {
  operation: 'addx' | 'noop'
  value: number
}

function renderCRT(pixels: boolean[][]): string {
  return pixels.map((row) => row.map((pixel) => (pixel ? '#' : '.')).join('')).join('\n')
}

function parseInput(input: string): Command[] {
  return input.split('\n').map((line) => {
    const [operation, value] = line.split(' ')
    return {
      operation: operation as 'addx' | 'noop',
      value: Number(value),
    }
  })
}

export function part1(input: string): number {
  let currentX = 1
  return parseInput(input)
    .flatMap((command) => {
      if (command.operation === 'addx') {
        const oldX = currentX
        currentX += command.value
        return [oldX, oldX]
      }
      return currentX
    })
    .map((x, i) => {
      const cycle = i + 1
      return x * cycle
    })
    .filter((signal, i) => {
      const cycle = i + 1
      const isInterestingSignal = cycle === 20 || cycle === 60 || cycle === 100 || cycle === 140 || cycle === 180 || cycle === 220
      return isInterestingSignal
    })
    .reduce((a, b) => a + b, 0)
}

export function part2(input: string): string {
  const pixels: boolean[][] = Array.from({ length: 6 }, () => Array.from({ length: 40 }, () => false))
  let currentX = 1
  const spritePositionPerCycle = parseInput(input)
    .flatMap((command) => {
      if (command.operation === 'addx') {
        const oldX = currentX
        currentX += command.value
        return [oldX, oldX]
      }
      return currentX
    })
    const litPixels = pixels.map((row, i) => {
      return row.map((pixel, pixelBeingDrawn) => {
        const cycle = i * 40 + pixelBeingDrawn + 1
        const spriteCenterPosition = spritePositionPerCycle[cycle - 1]
        const spriteOverlapsPixel = spriteCenterPosition - 1 <= pixelBeingDrawn && pixelBeingDrawn <= spriteCenterPosition + 1
        if (spriteOverlapsPixel) {
          return true
        }
        return false
      })
    })

    return renderCRT(litPixels)
  }
