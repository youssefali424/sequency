import { asyncSequenceOf } from "../../src/Sequence";

describe("toSet", () => {
  it("should return new set of distinct items", async () => {
    const result = await asyncSequenceOf(1, 2, 2, 3, 3, 3).toSet();
    expect(result.size).toBe(3);
    expect(result.has(1)).toBe(true);
    expect(result.has(2)).toBe(true);
    expect(result.has(3)).toBe(true);
  });

  it("should add distinct items to existing set", async () => {
    const existingSet = new Set([4]);
    const result = await asyncSequenceOf(1, 2, 2, 3, 3, 3).toSet(existingSet);
    expect(result).toBe(existingSet);
    expect(result.size).toBe(4);
    expect(result.has(1)).toBe(true);
    expect(result.has(2)).toBe(true);
    expect(result.has(3)).toBe(true);
    expect(result.has(4)).toBe(true);
  });
});
