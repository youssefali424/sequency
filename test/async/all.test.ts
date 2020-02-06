import { asyncSequenceOf } from "../../src/Sequence";

describe("all", () => {
  it("should return false", async () => {
    const result = await asyncSequenceOf(1, 2, 3).all(it => it > 1);
    expect(result).toBe(false);
  });

  it("should return true", async () => {
    const result = await asyncSequenceOf(1, 2, 3).all(it => it > 0);
    expect(result).toBe(true);
  });
});
