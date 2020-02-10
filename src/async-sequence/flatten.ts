import { AsyncSequence, asAsyncSequence } from "./asyncSequence";
import { isAsyncSequence } from "../Sequence";
export class Flatten {
  /**
   * Returns a single flat sequence of all the items from all sequences or iterables.
   *
   * @returns {AsyncSequence<T>}
   */
  flatten<T>(
    this: AsyncSequence<AsyncSequence<T> | AsyncIterableIterator<T>>
  ): AsyncSequence<T> {
    return this.flatMap(it => {
      if (isAsyncSequence(it)) {
        return it;
      } else {
        return asAsyncSequence(it);
      }
    });
  }
}
