import { AsyncSequence } from "./asyncSequence";

export class Drop {
  /**
   * Returns a new sequence which discards the first `n` elements;
   *
   * @param {number} n
   * @returns {AsyncSequence<T>}
   */
  drop<T>(this: AsyncSequence<T>, n: number): AsyncSequence<T> {
    return this.withIndex()
      .dropWhile(it => it.index < n)
      .map(it => it.value);
  }
}
