import { AsyncSequence } from "./asyncSequence";

export class Sum {
  /**
   * Returns the sum of all numbers.
   *
   * @returns {Promise<number>}
   */
  async sum(this: AsyncSequence<number>): Promise<number> {
    let result = 0;
    for await (let item of this.iterator) {
      result += item;
    }
    return result;
  }
}
