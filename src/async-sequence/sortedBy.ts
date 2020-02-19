import { AsyncSequence } from "./asyncSequence";

export class SortedBy {
  /**
   * Returns a new sequence with all elements sorted ascending by the value specified
   * by the given `selector` function.
   *
   * @param {(value: T) => R} selector
   * @returns {AsyncSequence<T>}
   */
  sortedBy<T, R>(
    this: AsyncSequence<T>,
    selector: (value: T) => R
  ): AsyncSequence<T> {
    return this.sorted(it => it.compareBy(selector));
  }
}
