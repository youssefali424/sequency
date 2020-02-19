import { AsyncSequence } from "./asyncSequence";

export class SortedDescending {
  /**
   * Returns a new sequence with all elements sorted in reverse (descending) natural order.
   *
   * @returns {AsyncSequence<T>}
   */
  sortedDescending<T>(this: AsyncSequence<T>): AsyncSequence<T> {
    return this.sorted(it => it.reverseOrder());
  }
}
