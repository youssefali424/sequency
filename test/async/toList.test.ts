import { asyncSequenceOf } from "../../src/Sequence";
import { asAsyncSequence } from "../../src/async-sequence/asyncSequence";

describe("toList", () => {
  it("should return new array", async () => {
    const input = [1, 2, 3];
    const array = await asAsyncSequence(input).toList();
    expect(input).not.toBe(array);
    expect(array.length).toBe(3);
    expect(array[0]).toBe(1);
    expect(array[1]).toBe(2);
    expect(array[2]).toBe(3);
  });

  it("should append items to passed array", async () => {
    const array = [1];
    const result = await asyncSequenceOf(2, 3, 4).toList(array);
    expect(result).toBe(array);
    expect(array.length).toBe(4);
    expect(array[0]).toBe(1);
    expect(array[1]).toBe(2);
    expect(array[2]).toBe(3);
    expect(array[3]).toBe(4);
  });
});
