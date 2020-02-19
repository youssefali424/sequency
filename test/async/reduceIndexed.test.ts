import { asyncSequenceOf } from "../../src/Sequence";

describe("reduceIndexed", () => {
  it("should sum all numbers + indices", async () => {
    const result = await asyncSequenceOf(1, 2, 3).reduceIndexed(
      (index: number, acc: number, value: number) => acc + value + index
    );
    expect(result).toBe(9);
  });
});
