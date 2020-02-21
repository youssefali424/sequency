import { AsyncSequence } from "./asyncSequence";

export class ToSet {
  /**
   * Returns all elements of the sequence as set. If a `set` is passed
   * the elements are added to this set.
   *
   * @param {Set<T>} set
   * @returns {Promise<Set<T>>}
   */
  async toSet<T>(this: AsyncSequence<T>, set?: Set<T>): Promise<Set<T>> {
    const result = set || new Set();
    for await (let item of this.iterator) {
      result.add(item);
    }
    return result;
  }
}
