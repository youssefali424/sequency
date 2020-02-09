import { AsyncSequence } from "./asyncSequence";

export class AsIterable {
  /**
   * Returns an iterable representation of the sequence.
   *
   * @returns {AsyncIterable<T>}
   */
  asIterable<T>(this: AsyncSequence<T>): AsyncIterable<T> {
    const iterator = this.iterator;
    return {
      [Symbol.asyncIterator](): AsyncIterator<T> {
        return iterator;
      }
    };
  }
}
