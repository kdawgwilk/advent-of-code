import { match, P } from "ts-pattern";
import { runSolution } from "../utils.ts";

type Direction = "L" | "R";
type Row = `${Direction}${number}`;

/** provide your solution as the return of this function */
export async function day1a(data: Row[]) {
  const DIAL_POSITION_OPTIONS = 100;
  let dialPosition = 50;
  const dialPositionHistory: number[] = [];
  for (const line of data) {
    const direction = line[0] as Direction;
    const steps = parseInt(line.slice(1), 10);
    const move = {
      direction,
      steps,
    };
    dialPosition = match(move)
      .with({ direction: "L", steps: P.number.gt(0) }, (move) => {
        dialPosition -= move.steps % DIAL_POSITION_OPTIONS;
        if (dialPosition < 0) {
          dialPosition = DIAL_POSITION_OPTIONS - Math.abs(dialPosition);
        }
        return dialPosition;
      })
      .with({ direction: "R", steps: P.number.gt(0) }, (move) => {
        dialPosition += move.steps % DIAL_POSITION_OPTIONS;
        if (dialPosition >= DIAL_POSITION_OPTIONS) {
          dialPosition = dialPosition - DIAL_POSITION_OPTIONS;
        }
        return dialPosition;
      })
      .otherwise(() => {
        throw new Error(`Invalid line: ${line}`);
      });
    dialPositionHistory.push(dialPosition);
  }
  const totalZeroPositions = dialPositionHistory.filter(
    (position) => position === 0
  ).length;
  return totalZeroPositions;
}

await runSolution(day1a);
