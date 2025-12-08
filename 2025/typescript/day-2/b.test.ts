import { before, describe, it, mock } from "node:test";
import type { runSolution } from "../utils.ts";

const runSolutionMock = mock.fn<typeof runSolution>();

mock.module("../utils.ts", {
  namedExports: {
    runSolution: runSolutionMock,
  },
});

// Dynamic import AFTER mock is set up to avoid import hoisting
const { isInvalidId, chunkArray } = await import("./b.ts");

describe("chunkArray", () => {
  it("should chunk an array into equal parts", (t) => {
    t.assert.deepEqual(chunkArray([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
  });
});

describe("isInvalidId", () => {
  before(() => {
    runSolutionMock.mock.mockImplementation(() => Promise.resolve());
  });

  it("should return true for 123123123", (t) => {
    t.assert.equal(isInvalidId(123123123), true);
  });

  it("should return true for 11", (t) => {
    t.assert.equal(isInvalidId(11), true);
  });

  it("should return true for 13", (t) => {
    t.assert.equal(isInvalidId(13), false);
  });

  it("should return true for 111", (t) => {
    t.assert.equal(isInvalidId(111), true);
  });

  it("should return true for 1188511885", (t) => {
    t.assert.equal(isInvalidId(1188511885), true);
  });

  it("should return true for 2121212121", (t) => {
    t.assert.equal(isInvalidId(2121212121), true);
  });

  it("should return false for 123456789", (t) => {
    t.assert.equal(isInvalidId(123456789), false);
  });
});
