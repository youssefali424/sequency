import { asyncSequenceOf } from "../../src/Sequence";

describe("distinctBy", () => {
    it("should dismiss items with duplicate selections", async () => {
        const result = await asyncSequenceOf({a: 1}, {a: 2}, {a: 1}, {a: 3})
            .distinctBy(it => it.a)
            .toArray();
        expect(result.length).toBe(3);
        expect(result[0].a).toBe(1);
        expect(result[1].a).toBe(2);
        expect(result[2].a).toBe(3);
    });
});