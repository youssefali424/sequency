import { asyncSequenceOf } from "../../src/Sequence";

describe("last", () => {
  it("should return last element of sequence", async () => {
    const result = await asyncSequenceOf(1, 2, 3)
      .filter(it => it > 1)
      .last();
    expect(result).toBe(3);
  });

  it("should throw error on empty sequence", async () => {
    expect(
      asyncSequenceOf(1, 2, 3)
        .filter(it => it > 3)
        .last()
    ).rejects.toThrow("No such element");
  });

  it("should return last element matching predicate", async () => {
    const result = await asyncSequenceOf(1, 2, 3).last(it => it > 1);
    expect(result).toBe(3);
  });

  it("should return null if the last element is null", async () => {
    const result = await asyncSequenceOf(1, 2, null).last();
    expect(result).toBeNull();
  });
});
