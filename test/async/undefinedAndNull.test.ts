import { asyncSequenceOf } from "../../src/Sequence";
import { asAsyncSequence } from "../../src/async-sequence/asyncSequence";

describe("undefinedAndNull", () => {
  it("should pass null values", async () => {
    const result = await asyncSequenceOf(
      1,
      2,
      null,
      3,
      null,
      null,
      null,
      4
    ).toList();
    expect(result).toEqual([1, 2, null, 3, null, null, null, 4]);
  });

  it("should pass undefined values", async () => {
    const result = await asyncSequenceOf(
      1,
      2,
      undefined,
      3,
      undefined,
      undefined,
      undefined,
      4
    ).toList();
    expect(result).toEqual([
      1,
      2,
      undefined,
      3,
      undefined,
      undefined,
      undefined,
      4
    ]);
  });

  it("should pass null and undefined values", async () => {
    const result = await asAsyncSequence([
      1,
      2,
      null,
      null,
      3,
      undefined,
      undefined,
      4
    ])
      .filter(it => it == null || it % 2 === 1)
      .map(it => String(it))
      .toList();
    expect(result).toEqual([
      "1",
      "null",
      "null",
      "3",
      "undefined",
      "undefined"
    ]);
  });
});
