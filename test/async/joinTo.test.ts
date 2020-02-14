import { asyncSequenceOf } from "../../src/Sequence";

describe("joinTo", () => {
  it("should join to given string", async () => {
    const result = await asyncSequenceOf(1, 2, 3).joinTo({
      value: "List: ",
      prefix: "[ ",
      postfix: " ]"
    });
    expect(result).toBe("List: [ 1, 2, 3 ]");
  });
});
