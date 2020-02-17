import { isAsyncSequence } from "../Sequence";
import { AsyncSequence } from "./asyncSequence";

export class Minus {
  /**
   * Removes the given `data` and returns a new sequence. Data can either be a single element, an array of elements
   * or a sequence of elements.
   *
   * @param {AsyncSequence<T> | Array<T> | T} data
   * @returns {AsyncSequence<T>}
   */
  async minus<T>(
    this: AsyncSequence<T>,
    data: T | AsyncSequence<T> | Array<T>
  ): Promise<AsyncSequence<T>> {
    if (isAsyncSequence(data)) {
      const array: Array<T> = await data.toArray();
      return this.filter(it => array.indexOf(it) < 0);
    } else if (data instanceof Array) {
      return this.filter(it => data.indexOf(it) < 0);
    } else {
      return this.filter(it => it !== data);
    }
  }
}
