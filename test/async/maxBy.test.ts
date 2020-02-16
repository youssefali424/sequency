import { emptyAsyncSequence, asyncSequenceOf } from "../../src/Sequence";

describe("maxBy", () => {
  it("should return max element by selector", async () => {
    const num = await asyncSequenceOf({ a: 1 }, { a: 3 }, { a: 2 }).maxBy(
      it => it.a
    );
    expect(num).toEqual({ a: 3 });
  });

  it("should return null on empty sequence", async () => {
    const num = await emptyAsyncSequence().maxBy(() => void 0);
    expect(num).toBeNull();
  });
});
