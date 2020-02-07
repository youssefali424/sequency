import { asyncSequenceOf } from "../../src/Sequence";

describe("firstOrNull", () => {
  it("should return first element of sequence", async () => {
    const result = await asyncSequenceOf(1, 2, 3)
      .filter(it => it > 2)
      .firstOrNull();
    expect(result).toBe(3);
  });

  it("should return null on empty sequence", async () => {
    const result = await asyncSequenceOf(1, 2, 3)
      .filter(it => it > 3)
      .firstOrNull();
    expect(result).toBeNull();
  });

  it("should return first element matching predicate", async () => {
    const result = await asyncSequenceOf(1, 2, 3).firstOrNull(it => it > 2);
    expect(result).toBe(3);
  });
});
