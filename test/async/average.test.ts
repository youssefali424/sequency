import { emptyAsyncSequence, asyncSequenceOf } from "../../src/Sequence";
import { AsyncSequence } from "../../src/async-sequence/asyncSequence";

describe("average", () => {
  it("should calculate average", async () => {
    const avg = await asyncSequenceOf(1, 2, 3, 4).average();
    expect(avg).toBe(2.5);
  });

  it("should return NaN on empty sequence", async () => {
    const sequence = emptyAsyncSequence() as AsyncSequence<number>;
    const avg = await sequence.average();
    expect(avg).toBeNaN();
  });
});
