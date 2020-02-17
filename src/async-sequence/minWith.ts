import { AsyncSequence } from "./asyncSequence";

export class MinWith {
  /**
   * Returns the minimum element of the sequence by evaluating the given `compare`
   * function or `null` if sequence is empty.
   *
   * @returns {Promise<T | null>}
   */
  async minWith<T>(
    this: AsyncSequence<T>,
    compare: (a: T, b: T) => number
  ): Promise<T | null> {
    let min: T | null = null;
    for await (let item of this.iterator) {
      if (min == null || compare(item, min) < 0) {
        min = item;
      }
    }
    return min;
  }
}
