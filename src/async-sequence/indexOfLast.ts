import { AsyncSequence } from "./asyncSequence";

export class IndexOfLast {
  /**
   * Returns the zero-based index of the last element matching the given `predicate` or -1 if no element matches
   * the predicate.
   *
   * @param {(value: T) => boolean} predicate
   * @returns {Promise<number>}
   */
  async indexOfLast<T>(
    this: AsyncSequence<T>,
    predicate: (value: T) => boolean
  ): Promise<number> {
    let index = 0;
    let result = -1;
    for await (let item of this.iterator) {
      if (predicate(item)) {
        result = index;
      }
      index++;
    }
    return result;
  }
}
