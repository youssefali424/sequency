import { AsyncSequence } from "./asyncSequence";

export class MaxWith {
  /**
   * Returns the maximum element of the sequence by evaluating the given `compare`
   * function or `null` if sequence is empty.
   *
   * @returns {Promise<T | null>}
   */
  async maxWith<T>(
    this: AsyncSequence<T>,
    compare: (a: T, b: T) => number
  ): Promise<T | null> {
    let max: T | null = null;
    for await (let item of this.iterator) {
      if (max == null || compare(item, max) > 0) {
        max = item;
      }
    }
    return max;
  }
}
