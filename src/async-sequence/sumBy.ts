import { AsyncSequence } from "./asyncSequence";

export class SumBy {
  /**
   * Returns the sum of all numbers specified by the given `selector` function.
   *
   * @param {(value: T) => number} selector
   * @returns {Promise<number>}
   */
  async sumBy<T>(
    this: AsyncSequence<T>,
    selector: (value: T) => number
  ): Promise<number> {
    let result = 0;
    for await (let item of this.iterator) {
      result += selector(item);
    }
    return result;
  }
}
