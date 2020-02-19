import { asyncSequenceOf, emptyAsyncSequence } from "../../src/Sequence";

describe("plus", () => {
  it("should append element", async () => {
    const array = await asyncSequenceOf(1, 2, 3)
      .plus(4)
      .toArray();
    expect(array.length).toBe(4);
    expect(array[0]).toBe(1);
    expect(array[1]).toBe(2);
    expect(array[2]).toBe(3);
    expect(array[3]).toBe(4);
  });

  it("should append array", async () => {
    const array = await asyncSequenceOf(1, 2, 3)
      .plus([4, 5])
      .toArray();
    expect(array.length).toBe(5);
    expect(array[0]).toBe(1);
    expect(array[1]).toBe(2);
    expect(array[2]).toBe(3);
    expect(array[3]).toBe(4);
    expect(array[4]).toBe(5);
  });

  it("should append sequence", async () => {
    const array = await asyncSequenceOf(1, 2, 3)
      .plus(asyncSequenceOf(4, 5))
      .toArray();
    expect(array.length).toBe(5);
    expect(array[0]).toBe(1);
    expect(array[1]).toBe(2);
    expect(array[2]).toBe(3);
    expect(array[3]).toBe(4);
    expect(array[4]).toBe(5);
  });

  it("should append empty sequence", async () => {
    const array = await asyncSequenceOf(1, 2, 3)
      .plus(emptyAsyncSequence())
      .toArray();
    expect(array.length).toBe(3);
    expect(array[0]).toBe(1);
    expect(array[1]).toBe(2);
    expect(array[2]).toBe(3);
  });
});
