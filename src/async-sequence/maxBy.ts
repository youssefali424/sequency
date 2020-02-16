import { AsyncSequence } from "./asyncSequence";

export class MaxBy {
  /**
   * Returns the maximum element by comparing the results of the given `selector` function
   * for each element of the sequence or `null` if the sequence is empty.
   *
   * @param {(value: T) => R} selector
   * @returns {Promise<T | null>}
   */
  async maxBy<T, R>(
    this: AsyncSequence<T>,
    selector: (value: T) => R
  ): Promise<T | null> {
    let max: T | null = null;
    let maxSelected: R | null = null;
    for await (let item of this.iterator) {
      const value = selector(item);
      if (maxSelected == null || value > maxSelected) {
        maxSelected = value;
        max = item;
      }
    }
    return max;
  }
}
