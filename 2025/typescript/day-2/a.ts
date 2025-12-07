import { runSolution } from "../utils.ts";

// Splits id into halves and checks if the halves are the same and if the halves are the same, return true
const isInvalidId = (id: number) => {
  const idString = id.toString();
  const halfLength = idString.length / 2;
  const firstHalf = idString.slice(0, halfLength);
  const secondHalf = idString.slice(halfLength);
  return firstHalf === secondHalf;
};

/** provide your solution as the return of this function */
export async function day2a(data: string[]) {
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
  const invalidIdSum = invalidIds.reduce((sum, id) => sum + id, 0);
  return invalidIdSum;
}
// Sample answer: 1227775554
await runSolution(day2a);
