import { asyncSequenceOf } from "../../src/Sequence";

describe("distinct", () => {
  it("should dismiss duplicate items", async () => {
    const result = await asyncSequenceOf(1, 1, 2, 3)
      .distinct()
      .toArray();
    expect(result.length).toBe(3);
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(2);
    expect(result[2]).toBe(3);
  });
});
