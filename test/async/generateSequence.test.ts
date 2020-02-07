import { generateAsyncSequence } from "../../src/Sequence";

describe("generateAsyncSequence", () => {
  it("should generate sequence", async () => {
    let count = 0;
    const result = await generateAsyncSequence(() => count++)
      .take(5)
      .toArray();
    expect(result.length).toBe(5);
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(1);
    expect(result[2]).toBe(2);
    expect(result[3]).toBe(3);
    expect(result[4]).toBe(4);
  });

  it("should generate sequence with drop and take", async () => {
    let count = 0;
    const result = await generateAsyncSequence(() => count++)
      .drop(5)
      .take(5)
      .toArray();
    expect(result.length).toBe(5);
    expect(result[0]).toBe(5);
    expect(result[1]).toBe(6);
    expect(result[2]).toBe(7);
    expect(result[3]).toBe(8);
    expect(result[4]).toBe(9);
  });

  it("should generate sequence with seed", async () => {
    const result = await generateAsyncSequence(10, value => value + 1)
      .takeWhile(it => it < 15)
      .toArray();
    expect(result.length).toBe(5);
    expect(result[0]).toBe(10);
    expect(result[1]).toBe(11);
    expect(result[2]).toBe(12);
    expect(result[3]).toBe(13);
    expect(result[4]).toBe(14);
  });

  it("should generate empty sequence with seed of null", async () => {
    const result = await generateAsyncSequence(null as number, a => a).count();
    expect(result).toBe(0);
  });

  it("should generate empty sequence with seed of undefined", async () => {
    const result = await generateAsyncSequence(
      undefined as number,
      a => a
    ).count();
    expect(result).toBe(0);
  });

  it("should generate sequence with seedFunction", async () => {
    const result = await generateAsyncSequence(
      () => 10,
      value => value + 1
    )
      .takeWhile(it => it < 15)
      .toArray();
    expect(result.length).toBe(5);
    expect(result[0]).toBe(10);
    expect(result[1]).toBe(11);
    expect(result[2]).toBe(12);
    expect(result[3]).toBe(13);
    expect(result[4]).toBe(14);
  });

  it("should generate empty sequence with seedFunction result of null", async () => {
    const result = await generateAsyncSequence(
      () => null as number,
      a => a
    ).count();
    expect(result).toBe(0);
  });

  it("should generate empty sequence with seedFunction result of undefined", async () => {
    const result = await generateAsyncSequence(
      () => undefined as number,
      a => a
    ).count();
    expect(result).toBe(0);
  });
});
