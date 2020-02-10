import { AsyncSequence } from "./asyncSequence";

export class FilterIndexed {
  /**
   * Returns a new sequence consisting of all elements that match the given `predicate`.
   *
   * @param {(index: number, value: T) => boolean} predicate
   * @returns {AsyncSequence<T>}
   */
  filterIndexed<T>(
    this: AsyncSequence<T>,
    predicate: (index: number, value: T) => boolean
  ): AsyncSequence<T> {
    return this.withIndex()
      .filter(it => predicate(it.index, it.value))
      .map(it => it.value);
  }
}
