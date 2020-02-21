import { asyncSequenceOf } from "../../src/Sequence";

describe("sumBy", () => {
  it("should sum all selected numbers", async () => {
    const result = await asyncSequenceOf({ a: 2 }, { a: 4 }, { a: 6 }).sumBy(
      it => it.a
    );
    expect(result).toBe(12);
  });
});
