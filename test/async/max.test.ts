import { emptyAsyncSequence, asyncSequenceOf } from "../../src/Sequence";

describe("max", () => {
  it("should return max element", async () => {
    const num = await asyncSequenceOf(1, 3, 2, 6, 3).max();
    expect(num).toBe(6);
  });

  it("should return null on empty sequence", async () => {
    const num = await emptyAsyncSequence().max();
    expect(num).toBeNull();
  });
});
