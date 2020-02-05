import { asyncSequenceOf } from "../src/Sequence";

describe("asIterable", () => {
  it("should return an iterable object conforming to the iterator-protocol", async () => {
    const iterable = asyncSequenceOf(1, 2, 3, 4, 5)
      .filter(it => it % 2 === 1)
      .asIterable();
    const iterator = iterable[Symbol.asyncIterator]();
    expect((await iterator.next()).value).toBe(1);
    expect((await iterator.next()).value).toBe(3);
    expect((await iterator.next()).value).toBe(5);
    expect((await iterator.next()).done).toBe(true);
  });
});
