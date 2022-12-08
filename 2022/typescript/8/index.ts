function createGrid(input: string): number[][] {
  return input.split('\n').map((line) => {
    return line.split('').map((tree) => Number(tree))
  })
}

function transpose<T>(matrix: Array<T>[]): Array<T>[] {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

export function visibleTrees(trees: number[]): boolean[] {
  const treesCopy = [...trees]
  const visibleTrees = Array.from({ length: trees.length }, () => false)
  let highestTree = -1
  treesCopy.forEach((tree, index) => {
    if (tree > highestTree) {
      highestTree = tree
      visibleTrees[index] = true
    }
  })
  highestTree = -1
  treesCopy.reverse().forEach((tree, index) => {
    if (tree > highestTree) {
      highestTree = tree
      visibleTrees[trees.length - index - 1] = true
    }
  })
  return visibleTrees
}

export function part1(input: string): number {
  const grid = createGrid(input)
  const horizontalVisibleTrees = grid.map((row) => visibleTrees(row))
  const verticalVisibleTrees = transpose(grid).map((row) => visibleTrees(row))
  // deduplicate trees that are visible in both directions
  horizontalVisibleTrees.forEach((row, rowIndex) => {
    row.forEach((tree, treeIndex) => {
      if (tree && verticalVisibleTrees[treeIndex][rowIndex]) {
        horizontalVisibleTrees[rowIndex][treeIndex] = false
      }
    })
  })
  const horizontalVisibleTreeCount = horizontalVisibleTrees.reduce((total, row) => {
    return total + row.filter((tree) => tree).length
  }
  , 0)
  const verticalVisibleTreeCount = verticalVisibleTrees.reduce((total, row) => {
    return total + row.filter((tree) => tree).length
  }, 0)
  return horizontalVisibleTreeCount + verticalVisibleTreeCount
}

export function part2(input: string): number {
  const grid = createGrid(input)

  const scenicScores = grid.map((row, rowIndex) => {
    return row.map((tree, treeIndex) => {
      let leftViewingDistance = 0
      for (let i = treeIndex - 1; i >= 0; i--) {
        if (grid[rowIndex][i] >= tree) {
          leftViewingDistance++
          break
        }
        leftViewingDistance++
      }
      let rightViewingDistance = 0
      for (let i = treeIndex + 1; i < row.length; i++) {
        if (grid[rowIndex][i] >= tree) {
          rightViewingDistance++
          break
        }
        rightViewingDistance++
      }
      let upViewingDistance = 0
      for (let i = rowIndex - 1; i >= 0; i--) {
        if (grid[i][treeIndex] >= tree) {
          upViewingDistance++
          break
        }
        upViewingDistance++
      }
      let downViewingDistance = 0
      for (let i = rowIndex + 1; i < grid.length; i++) {
        if (grid[i][treeIndex] >= tree) {
          downViewingDistance++
          break
        }
        downViewingDistance++
      }

      return leftViewingDistance * rightViewingDistance * upViewingDistance * downViewingDistance
    })
  })
  
  const highestScenicScore = scenicScores.reduce((highest, row) => {
    return Math.max(highest, Math.max(...row))
  }, 0)
  return highestScenicScore
}
