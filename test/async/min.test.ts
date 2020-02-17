import { emptyAsyncSequence, asyncSequenceOf } from "../../src/Sequence";

describe("min", () => {
  it("should return min element", async () => {
    const num = await asyncSequenceOf(3, 1, 2, 6, 3).min();
    expect(num).toBe(1);
  });

  it("should return null on empty sequence", async () => {
    const num = await emptyAsyncSequence().min();
    expect(num).toBeNull();
  });
});
