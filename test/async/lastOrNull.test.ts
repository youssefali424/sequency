import { asyncSequenceOf } from "../../src/Sequence";

describe("lastOrNull", () => {
  it("should return last element of sequence", async () => {
    const result = await asyncSequenceOf(1, 2, 3).lastOrNull();
    expect(result).toBe(3);
  });

  it("should return null on empty sequence", async () => {
    const result = await asyncSequenceOf(1, 2, 3)
      .filter(it => it > 3)
      .lastOrNull();
    expect(result).toBeNull();
  });

  it("should return last element matching predicate", async () => {
    const result = await asyncSequenceOf(1, 2, 3).lastOrNull(it => it > 1);
    expect(result).toBe(3);
  });
});
