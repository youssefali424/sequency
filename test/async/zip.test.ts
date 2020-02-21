import { asyncSequenceOf } from "../../src/Sequence";

describe("zip", () => {
  it("should combine items from both sequences into pairs", async () => {
    const array = await asyncSequenceOf("a", "b", "c")
      .zip(asyncSequenceOf(1, 2, 3))
      .toArray();
    expect(array.length).toBe(3);
    expect(array[0]).toEqual(["a", 1]);
    expect(array[1]).toEqual(["b", 2]);
    expect(array[2]).toEqual(["c", 3]);
  });

  it("should discard elements if length of sequences is different", async () => {
    const array = await asyncSequenceOf(1, 2, 3)
      .zip(asyncSequenceOf(1, 2, 3, 4, 5, 6, 7))
      .toArray();
    expect(array.length).toBe(3);
  });
});
