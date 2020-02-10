import { asyncSequenceOf } from "../../src/Sequence";

describe("contains", () => {
  it("should contain element", async () => {
    const result = await asyncSequenceOf(1, 2, 3).contains(3);
    expect(result).toBe(true);
  });

  it("should not contain element", async () => {
    const result = await asyncSequenceOf(1, 2, 3).contains(4);
    expect(result).toBe(false);
  });
});
