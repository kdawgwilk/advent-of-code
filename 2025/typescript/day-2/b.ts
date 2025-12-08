import { runSolution } from "../utils.ts";

export const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
  return [...Array(Math.ceil(array.length / chunkSize))].map((_, index) =>
    array.slice(index * chunkSize, (index + 1) * chunkSize)
  );
};

// Starting with the length of the id as the initial divisor, we can chunk the id into equal parts
// If the chunks are the same, return true
// If the chunks are not the same, decrement the divisor and try again
// If the divisor is 1 and the chunks are not the same, return false
export const isInvalidId = (id: number) => {
  const idString = id.toString();
  const length = idString.length;
  if (length === 2) {
    return idString[0] === idString[1];
  }
  for (let divisor = 1; divisor < length; divisor++) {
    if (length % divisor !== 0) {
      continue;
    }
    // console.log(`Trying divisor: ${divisor}`);
    const chunks = chunkArray(idString.split(""), divisor);
    // console.log(`Chunks: ${chunks}`);
    if (
      chunks.every((chunk) => chunk.every((digit, i) => digit === chunks[0][i]))
    ) {
      // console.log(`Valid chunks found: ${chunks}`);
      return true;
    }
  }
  return false;
};

/** provide your solution as the return of this function */
export async function day2b(data: string[]) {
  const rangeStrings = data[0]?.split(",") ?? [];
  const ranges = rangeStrings.map(
    (range) => range.split("-").map(Number) as [number, number]
  );
  const invalidIds = [];
  for (const range of ranges) {
    for (let id = range[0]; id <= range[1]; id++) {
      if (isInvalidId(id)) {
        invalidIds.push(id);
      }
    }
  }
  console.log(`Invalid IDs: ${invalidIds}`);
  const invalidIdSum = invalidIds.reduce((sum, id) => sum + id, 0);
  return invalidIdSum;
}

// Sample answer: 4174379265
await runSolution(day2b);
