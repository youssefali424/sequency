import { asyncSequenceOf } from "../../src/Sequence";

describe("chunk", () => {
  it("should return list of chunks", async () => {
    const chunks = await asyncSequenceOf(1, 2, 3, 4, 5).chunk(2);
    expect(chunks.length).toBe(3);

    expect(chunks[0].length).toBe(2);
    expect(chunks[0][0]).toBe(1);
    expect(chunks[0][1]).toBe(2);

    expect(chunks[1].length).toBe(2);
    expect(chunks[1][0]).toBe(3);
    expect(chunks[1][1]).toBe(4);

    expect(chunks[2].length).toBe(1);
    expect(chunks[2][0]).toBe(5);
  });

  it("should return single chunk", async () => {
    const chunks = await asyncSequenceOf(1, 2, 3).chunk(5);
    expect(chunks.length).toBe(1);
    expect(chunks[0].length).toBe(3);
    expect(chunks[0][0]).toBe(1);
    expect(chunks[0][1]).toBe(2);
    expect(chunks[0][2]).toBe(3);
  });

  it("should return one-size chunks", async () => {
    const chunks = await asyncSequenceOf(1, 2, 3).chunk(1);
    expect(chunks.length).toBe(3);
    expect(chunks[0].length).toBe(1);
    expect(chunks[0][0]).toBe(1);
    expect(chunks[1].length).toBe(1);
    expect(chunks[1][0]).toBe(2);
    expect(chunks[2].length).toBe(1);
    expect(chunks[2][0]).toBe(3);
  });

  it("should throw", async () => {
    await expect(asyncSequenceOf(1, 2, 3).chunk(0)).rejects.toEqual(
      new Error("chunkSize must be > 0 but is 0")
    );

    await expect(asyncSequenceOf(1, 2, 3).chunk(-1)).rejects.toEqual(
      new Error("chunkSize must be > 0 but is -1")
    );
  });
});
