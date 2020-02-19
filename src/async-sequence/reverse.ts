import { AsyncSequence } from "./asyncSequence";

export class Reverse {
  /**
   * Returns a new sequence with all elements of the sequence in reverse order.
   *
   * @returns {AsyncSequence<T>}
   */
  reverse<T>(this: AsyncSequence<T>): AsyncSequence<T> {
    return this.withIndex()
      .sortedByDescending(it => it.index)
      .map(it => it.value);
  }
}
