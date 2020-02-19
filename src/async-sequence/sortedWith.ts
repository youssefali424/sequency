import { AsyncSequence } from "./asyncSequence";

export class SortedWith {
  /**
   * Returns a new sequence with all elements sorted be the given `compare` function.
   *
   * @param {(a: T, b: T) => number} comparison
   * @returns {AsyncSequence<T>}
   */
  sortedWith<T>(
    this: AsyncSequence<T>,
    comparison: (a: T, b: T) => number
  ): AsyncSequence<T> {
    return this.sorted(it => it.compare(comparison));
  }
}
