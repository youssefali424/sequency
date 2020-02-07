import { sequenceOf, range, generateSequence } from "../../src/Sequence";

describe("range", () => {
  it("should create range of numbers with step = 1 and collect it asynchronously", async () => {
    const numbers = await range(0, 5)
      .toAsyncSequence()
      .toArray();
    expect(numbers).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("should generate sequence", async () => {
    let count = 0;
    const result = await generateSequence(() => count++)
      .toAsyncSequence()
      .take(5)
      .toArray();
    expect(result.length).toBe(5);
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(1);
    expect(result[2]).toBe(2);
    expect(result[3]).toBe(3);
    expect(result[4]).toBe(4);
  });

  it("should create sequence and convert it to async sequence", async () => {
    const numbers = await sequenceOf(1, 2, 3, 4, 5)
      .toAsyncSequence()
      .count();
    expect(numbers).toEqual(5);
  });
});
