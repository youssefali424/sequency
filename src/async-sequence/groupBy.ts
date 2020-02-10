import { AsyncSequence } from "./asyncSequence";

export class GroupBy {
  /**
   * Groups all elements of the sequence into a map. Keys are determined by the given `keySelector` function.
   *
   * @param {(value: T) => K} keySelector
   * @returns {Promise<Map<K, Array<T>>>}
   */
  async groupBy<T, K>(
    this: AsyncSequence<T>,
    keySelector: (value: T) => K
  ): Promise<Map<K, Array<T>>> {
    const result = new Map<K, Array<T>>();
    for await (let item of this.iterator) {
      const key = keySelector(item);
      const array = result.get(key);
      if (array == null) {
        result.set(key, [item]);
      } else {
        array.push(item);
      }
    }
    return result;
  }
}
