import { asyncSequenceOf, emptyAsyncSequence } from "../../src/Sequence";

describe("single", () => {
  it("should return single element", async () => {
    const result = await asyncSequenceOf(23).single();
    expect(result).toBe(23);
  });

  it("should throw with more than one element", async () => {
    expect(asyncSequenceOf(1, 2).single()).rejects.toThrow();
  });

  it("should throw with zero elements", async () => {
    expect(emptyAsyncSequence().single()).rejects.toThrow();
  });

  it("should evaluate predicate and return single element", async () => {
    const result = await asyncSequenceOf(1, 2, 3).single(it => it > 2);
    expect(result).toBe(3);
  });

  it("should evaluate predicate and throw with more than one element", async () => {
    expect(asyncSequenceOf(1, 2).single(it => it > 0)).rejects.toThrow();
  });

  it("should evaluate predicate and throw with zero elements", async () => {
    expect(asyncSequenceOf(1, 2, 3).single(it => it > 3)).rejects.toThrow();
  });
});
