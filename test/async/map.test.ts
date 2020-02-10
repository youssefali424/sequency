import { asyncSequenceOf } from "../../src/Sequence";

describe("map", () => {
  it("should map numbers to strings", async () => {
    const array = await asyncSequenceOf(1, 2, 3)
      .map(it => `num ${it}`)
      .toArray();

    expect(array.length).toBe(3);
    expect(array[0]).toBe("num 1");
    expect(array[1]).toBe("num 2");
    expect(array[2]).toBe("num 3");
  });
});
