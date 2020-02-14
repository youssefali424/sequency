import { AsyncSequence } from "./asyncSequence";

export class MapIndexed {
  /**
   * Transforms each element into another value by applying the given `transform` function and returns a new sequence.
   *
   * @param {(index: number, value: T) => R} transform
   * @returns {AsyncSequence<R>}
   */
  mapIndexed<T, R>(
    this: AsyncSequence<T>,
    transform: (index: number, value: T) => R
  ): AsyncSequence<R> {
    return this.withIndex().map(it => transform(it.index, it.value));
  }
}
