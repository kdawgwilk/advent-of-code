export interface File {
  type: 'file'
  name: string
  size: number
}

export interface Dir {
  type: 'dir'
  name: string
  children: (File | Dir)[]
  size?: number
}

export function addFile(dir: Dir, path: string[], fileOrDir: File | Dir) {
  const currentPath = path[0]
  if (path.length === 0) {
    dir.children.push(fileOrDir)
  } else {
    const child = dir.children.find((child) => child.name === currentPath) as Dir
    if (child && child.type === 'dir') {
      addFile(child, path.slice(1), fileOrDir)
    } else {
      throw new Error(`Could not find dir ${currentPath}`)
    }
  }
}

export function renderFilesystem(dir: Dir, depth = 0): string {
  const output: string[] = []
  output.push('  '.repeat(depth) + '- ' + dir.name + ' (dir, size=' + (dir.size || 0) + ')')
  dir.children.forEach((child) => {
    if (child.type === 'dir') {
      output.push(renderFilesystem(child, depth + 1))
    } else {
      output.push('  '.repeat(depth + 1) + '- ' + child.name + ' (file, size=' + child.size + ')')
    }
  })
  return output.join('\n')
}

function parseInput(input: string): Dir {
  const root: Dir = { type: 'dir', name: '/', children: [], size: 0 }
  let currentPath: string[] = []
  input.split('\n').forEach((line) => {
    if (line.startsWith('$')) {
      const [command, dir] = line.slice(2).split(' ')
      if (command === 'cd' && dir !== '..' && dir !== '/') {
        currentPath.push(dir)

      } else if (command === 'cd' && dir === '..') {
        currentPath.pop()

      } else if (command === 'cd' && dir === '/') {
        currentPath = []
      } else if (command === 'ls') {
        // Do nothing
      } else {
        throw new Error(`Unknown command: ${command}`)
      }
    } else {
      if (line.startsWith('dir')) {
        const dir: Dir = { type: 'dir', name: line.slice(4), children: [], size: 0 }
        addFile(root, currentPath, dir)
      } else {
        const [size, name] = line.split(' ')
        const file: File = { type: 'file', name, size: Number(size) }
        addFile(root, currentPath, file)
      }
    }
  })
  postWalkDir(root, (dir) => {
    dir.size = dir.children.reduce((acc, child) => {
      if (child.type === 'dir') {
        return acc + (child.size || 0)
      } else {
        return acc + child.size
      }
    }
    , 0)
  })
  return root
}

function postWalkDir(dir: Dir, callback: (dir: Dir) => void) {
  dir.children.forEach((child) => {
    if (child.type === 'dir') {
      postWalkDir(child, callback)
    }
  })
  callback(dir)
}

export function part1(input: string): number {
  const maxSize = 100000
  const filesystem = parseInput(input)
  const dirs: Dir[] = []
  postWalkDir(filesystem, (dir) => {
    if ((dir.size || 0)<= maxSize) {
      dirs.push(dir)
    }
  })
  // console.log(renderFilesystem(filesystem))
  return dirs.reduce((acc, dir) => acc + (dir.size || 0), 0)
}

export function part2(input: string): number {
  const totalDiskSpace = 70000000
  const unusedSpaceRequired = 30000000
  const dirs: Dir[] = []
  // Find dirs that could create enough requiredSpace
  const filesystem = parseInput(input)
  const usedSpace = filesystem.size || 0
  const availableSpace = totalDiskSpace - usedSpace
  postWalkDir(filesystem, (dir) => {
    if ((dir.size || 0) + availableSpace >= unusedSpaceRequired) {
      dirs.push(dir)
    }
  })

  // Find smallest dir
  const smallestDir = Math.min(...dirs.map((dir) => dir.size || 0))
  return smallestDir
}
