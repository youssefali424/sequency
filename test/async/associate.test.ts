import { asyncSequenceOf } from "../../src/Sequence";

describe("associate", () => {
  it("should associate map", async () => {
    const map = await asyncSequenceOf(1, 2, 3).associate(it => [
      `key_${it}`,
      it
    ]);
    expect(map.size).toBe(3);
    expect(map.get("key_1")).toBe(1);
    expect(map.get("key_2")).toBe(2);
    expect(map.get("key_3")).toBe(3);
  });

  it("latest entries should win in case of duplicates", async () => {
    const map = await asyncSequenceOf(
      { k: 1, v: 1 },
      { k: 1, v: 11 },
      { k: 1, v: 111 },
      { k: 2, v: 222 }
    ).associate(it => [it.k, it.v]);
    expect(map.size).toBe(2);
    expect(map.get(1)).toBe(111);
    expect(map.get(2)).toBe(222);
  });
});
