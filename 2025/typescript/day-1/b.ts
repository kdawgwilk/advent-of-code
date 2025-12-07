import { match, P } from "ts-pattern";
import { runSolution } from "../utils.ts";

type Direction = "L" | "R";
type Row = `${Direction}${number}`;

// 5900 Too high
// 5873 wrong
// 5397 too low
// 4814 too low
/** provide your solution as the return of this function */
export async function day1b(data: Row[]) {
  const DIAL_POSITION_OPTIONS = 100; // 0-99
  let dialPosition = 50; // Starts at 50
  let dialPositionZeroCount = 0;
  for (const line of data) {
    const direction = line[0] as Direction;
    const stepsToMove = parseInt(line.slice(1), 10);
    const steps = stepsToMove % DIAL_POSITION_OPTIONS;
    const fullTurns = Math.floor(stepsToMove / DIAL_POSITION_OPTIONS);
    const move = {
      direction,
      steps,
    };
    dialPositionZeroCount += fullTurns;
    dialPosition = match([dialPosition, move])
      .with(
        [P.number, { direction: "L", steps: P.number.gt(0) }],
        ([startingPosition, move]) => {
          // 0 = 55 - 55
          const newDialPosition = startingPosition - move.steps;
          if (newDialPosition === 0) {
            dialPositionZeroCount += 1;
          }
          if (newDialPosition < 0) {
            if (startingPosition !== 0) {
              dialPositionZeroCount += 1;
            }
            return DIAL_POSITION_OPTIONS - Math.abs(newDialPosition);
          }
          return newDialPosition;
        }
      )
      .with(
        [P.number, { direction: "R", steps: P.number.gt(0) }],
        ([startingPosition, move]) => {
          // 155 = 95 + 60
          const newDialPosition = startingPosition + move.steps;
          if (newDialPosition >= DIAL_POSITION_OPTIONS) {
            dialPositionZeroCount += 1;
            return newDialPosition - DIAL_POSITION_OPTIONS;
          }
          return newDialPosition;
        }
      )
      .otherwise(() => {
        throw new Error(`Invalid line: ${line}`);
      });
  }
  return dialPositionZeroCount;
}

await runSolution(day1b);
