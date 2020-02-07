import { asyncSequenceOf } from "../../src/Sequence";

describe("dropWhile", () => {
    it("should drop elements until predicate evaluates to false", async () => {
        const result = await asyncSequenceOf(1, 2, 3, 2, 1)
            .dropWhile(it => it < 3)
            .toArray();
        expect(result.length).toBe(3);
        expect(result[0]).toBe(3);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(1);
    });

    it("should drop no elements", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .dropWhile(it => it > 3)
            .toArray();
        expect(result.length).toBe(3);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
    });

    it("should drop all elements", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .dropWhile(it => it > 0)
            .toArray();
        expect(result.length).toBe(0);
    });
});