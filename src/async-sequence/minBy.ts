import { AsyncSequence } from "./asyncSequence";

export class MinBy {
  /**
   * Returns the minimum element by comparing the results of the given `selector` function
   * for each element of the sequence or `null` if the sequence is empty.
   *
   * @param {(value: T) => R} selector
   * @returns {T}
   */
  async minBy<T, R>(
    this: AsyncSequence<T>,
    selector: (value: T) => R
  ): Promise<T | null> {
    let min: T | null = null;
    let minSelected: R | null = null;
    for await (let item of this.iterator) {
      const value = selector(item);
      if (minSelected == null || value < minSelected) {
        minSelected = value;
        min = item;
      }
    }
    return min;
  }
}
