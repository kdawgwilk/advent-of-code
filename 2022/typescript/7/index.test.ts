import * as fs from 'fs'
import { addFile, renderFilesystem, part1, part2, Dir } from '.'

const sampleInput = fs.readFileSync('./7/sample.txt', 'utf8')
const puzzleInput = fs.readFileSync('./7/input.txt', 'utf8')

describe('addFile', () => {
  test('adds dir at correct path', () => {
    const root: Dir = { type: 'dir', name: '/', children: [
      { type: 'dir', name: 'a', children: [] },
    ] }

    addFile(root, ['a'], { type: 'dir', name: 'b', children: [] })

    expect(root.children[0].name).toBe('a')
    expect(root.children[0].type).toBe('dir')
    expect((root.children[0] as Dir).children[0].name).toBe('b')
    expect((root.children[0] as Dir).children[0].type).toBe('dir')
  })

  test('adds file at correct path', () => {
    const root: Dir = { type: 'dir', name: '/', children: [
      { type: 'dir', name: 'a', children: [] },
    ] }

    addFile(root, ['a'], { type: 'file', name: 'b', size: 1 })

    expect(root.children[0].name).toBe('a')
    expect(root.children[0].type).toBe('dir')
    expect((root.children[0] as Dir).children[0].name).toBe('b')
    expect((root.children[0] as Dir).children[0].type).toBe('file')  
  })
})

describe('renderFilesystem', () => {
  test('renders filesystem accurately', () => {
    const root: Dir = { type: 'dir', name: '/', children: [
      { type: 'dir', name: 'b', children: [
        { type: 'file', name: 'd', size: 2 },
        { type: 'file', name: 'e', size: 3 },
      ], size: 5 },
      { type: 'file', name: 'c', size: 1 },
    ], size: 6 }

    const output = renderFilesystem(root)

    expect(output).toBe(
`- / (dir, size=6)
  - b (dir, size=5)
    - d (file, size=2)
    - e (file, size=3)
  - c (file, size=1)`)
  })
})

describe('part1', () => {
  test('sample', () => {
    const output = part1(sampleInput)

    expect(output).toBe(95437)
  })

  test('puzzle', () => {
    const output = part1(puzzleInput)

    expect(output).toBe(1642503)
  })
})

describe('part2', () => {
  test('sample', () => {
    const output = part2(sampleInput)

    expect(output).toBe(24933642)
  })

  test('puzzle', () => {
    const output = part2(puzzleInput)

    expect(output).toBe(6999588)
  })
})