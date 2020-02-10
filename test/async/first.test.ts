import { asyncSequenceOf } from "../../src/Sequence";

describe("first", () => {
  it("should return first element of sequence", async () => {
    const result = await asyncSequenceOf(1, 2, 3)
      .filter(it => it > 2)
      .first();
    expect(result).toBe(3);
  });

  it("should throw error on empty sequence", async () => {
    expect(
      asyncSequenceOf(1, 2, 3)
        .filter(it => it > 3)
        .first()
    ).rejects.toThrow("No such element");
  });

  it("should return first element matching predicate", async () => {
    const result = await asyncSequenceOf(1, 2, 3).first(it => it > 2);
    expect(result).toBe(3);
  });

  it("should return null if the first element is null", async () => {
    const result = await asyncSequenceOf(null).first();
    expect(result).toBeNull();
  });
});
