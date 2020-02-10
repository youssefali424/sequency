import { asyncSequenceOf } from "../../src/Sequence";

describe("forEach", () => {
  it("should call action for each element", async () => {
    const array = [];
    await asyncSequenceOf(1, 2, 3).forEachIndexed((index, value) =>
      array.push(`${index}: ${value}`)
    );
    expect(array[0]).toBe("0: 1");
    expect(array[1]).toBe("1: 2");
    expect(array[2]).toBe("2: 3");
  });
});
