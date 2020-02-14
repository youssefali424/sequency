import { emptyAsyncSequence, asyncSequenceOf } from "./../Sequence";
import { AsyncSequence } from "./asyncSequence";

export class MapNotNull {
  /**
   * Transforms each element into another value by applying the given `transform` function and returns a new sequence.
   * Transformations into `null` values are discarded.
   *
   * @param {(value: T) => R} transform
   * @returns {AsyncSequence<R>}
   */
  mapNotNull<T, R>(
    this: AsyncSequence<T>,
    transform: (value: T) => R | null
  ): AsyncSequence<R> {
    return this.flatMap((value: T) => {
      const item = transform(value);
      return item !== null ? asyncSequenceOf(item) : emptyAsyncSequence();
    });
  }
}
