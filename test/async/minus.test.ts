import { emptyAsyncSequence, asyncSequenceOf } from "../../src/Sequence";

describe("minus", () => {
  it("should remove element", async () => {
    const array = await (await asyncSequenceOf(1, 2, 3).minus(1)).toArray();
    expect(array.length).toBe(2);
    expect(array[0]).toBe(2);
    expect(array[1]).toBe(3);
  });

  it("should remove array", async () => {
    const array = await (
      await asyncSequenceOf(1, 2, 3, 4, 5).minus([2, 4])
    ).toArray();
    expect(array.length).toBe(3);
    expect(array[0]).toBe(1);
    expect(array[1]).toBe(3);
    expect(array[2]).toBe(5);
  });

  it("should append sequence", async () => {
    const array = await (
      await asyncSequenceOf(1, 2, 3).minus(asyncSequenceOf(1, 2))
    ).toArray();
    expect(array.length).toBe(1);
    expect(array[0]).toBe(3);
  });

  it("should append empty sequence", async () => {
    const array = await (
      await asyncSequenceOf(1, 2, 3).minus(emptyAsyncSequence())
    ).toArray();
    expect(array.length).toBe(3);
    expect(array[0]).toBe(1);
    expect(array[1]).toBe(2);
    expect(array[2]).toBe(3);
  });
});
