
export function part1(input: string): number {
  return input.split('\n').map((line): number => {
    const [firstElfAssignmentPair, secondElfAssignmentPair] = line.split(',')
      .map((assignment) => assignment.split('-').map(num => Number(num)))
      
    // Check if either elf's assignment is in the other's range
    // Return 1 if so, 0 if not
    const firstElfAssignmentContainsSecondElfAssignment = firstElfAssignmentPair[0] <= secondElfAssignmentPair[0] && firstElfAssignmentPair[1] >= secondElfAssignmentPair[1]
    const secondElfAssignmentContainsFirstElfAssignment = secondElfAssignmentPair[0] <= firstElfAssignmentPair[0] && secondElfAssignmentPair[1] >= firstElfAssignmentPair[1]
    return (
      firstElfAssignmentContainsSecondElfAssignment ||
      secondElfAssignmentContainsFirstElfAssignment
    ) ? 1 : 0
  }).reduce((acc, curr) => acc + curr, 0)
}

export function part2(input: string): number {
  return input.split('\n').map((line): number => {
    const [firstElfAssignmentPair, secondElfAssignmentPair] = line.split(',')
      .map((assignment) => assignment.split('-').map(num => Number(num)))
      
    // Check if elf's assignment overlaps with the other's
    // Return 1 if so, 0 if not
    const firstElfAssignmentOverlapsSecondElfAssignment = firstElfAssignmentPair[0] <= secondElfAssignmentPair[0] && firstElfAssignmentPair[1] >= secondElfAssignmentPair[0]
    const secondElfAssignmentOverlapsFirstElfAssignment = secondElfAssignmentPair[0] <= firstElfAssignmentPair[0] && secondElfAssignmentPair[1] >= firstElfAssignmentPair[0]
    return (
      firstElfAssignmentOverlapsSecondElfAssignment ||
      secondElfAssignmentOverlapsFirstElfAssignment
    ) ? 1 : 0
  }).reduce((acc, curr) => acc + curr, 0)
}
