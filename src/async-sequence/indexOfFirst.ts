import { AsyncSequence } from "./asyncSequence";

export class IndexOfFirst {
  /**
   * Returns the zero-based index of the first element matching the given `predicate` or -1 if no element matches
   * the predicate.
   *
   * @param {(value: T) => boolean} predicate
   * @returns {Promise<number>}
   */
  async indexOfFirst<T>(
    this: AsyncSequence<T>,
    predicate: (value: T) => boolean
  ): Promise<number> {
    let index = 0;
    for await (let item of this.iterator) {
      if (predicate(item)) {
        return index;
      }
      index++;
    }
    return -1;
  }
}
