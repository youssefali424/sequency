import { AsyncSequence } from "./asyncSequence";

export class Fold {
  /**
   * Accumulates all elements of the sequence into a single result by applying the given `operation` starting with
   * the `initial` value. The result of the last operation will be passed as accumulated value to the getNext invocation
   * of the operation until all elements of the sequence are processed.
   *
   * @param {R} initial
   * @param {(acc: R, element: T) => R} operation
   * @returns {Promise<R>}
   */
  async fold<T, R>(
    this: AsyncSequence<T>,
    initial: R,
    operation: (acc: R, element: T) => R
  ): Promise<R> {
    let result = initial;
    for await (let item of this.iterator) {
      result = operation(result, item);
    }
    return result;
  }
}
