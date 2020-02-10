import { asyncSequenceOf } from "../../src/Sequence";

describe("flatten", () => {
  //   it("should flatten sequence of sequences", async () => {
  //     const array = await asyncSequenceOf(
  //       asyncSequenceOf(1, 2),
  //       asyncSequenceOf(3, 4),
  //       asyncSequenceOf(5, 6)
  //     )
  //       .flatten()
  //       .toArray();
  //     expect(array.length).toBe(6);
  //     expect(array[0]).toBe(1);
  //     expect(array[1]).toBe(2);
  //     expect(array[2]).toBe(3);
  //     expect(array[3]).toBe(4);
  //     expect(array[4]).toBe(5);
  //     expect(array[5]).toBe(6);
  //   });

  it("should flatten sequence of arrays", async () => {
    const array = await asyncSequenceOf([1, 2], [3, 4], [5, 6])
      .flatten()
      .toArray();
    expect(array.length).toBe(6);
    expect(array[0]).toBe(1);
    expect(array[1]).toBe(2);
    expect(array[2]).toBe(3);
    expect(array[3]).toBe(4);
    expect(array[4]).toBe(5);
    expect(array[5]).toBe(6);
  });
});
