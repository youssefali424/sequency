import Sequence from "./Sequence";

export class GroupBy {
  /**
   * Groups all elements of the sequence into a map. Keys are determined by the given `keySelector` function.
   *
   * @param {(value: T) => K} keySelector
   * @returns {Map<K, Array<T>>}
   */
  groupBy<T, K>(
    this: Sequence<T>,
    keySelector: (value: T) => K
  ): Map<K, Array<T>> {
    const result = new Map<K, Array<T>>();
    for (
      let item = this.iterator.next();
      !item.done;
      item = this.iterator.next()
    ) {
      const key = keySelector(item.value);
      const array = result.get(key);
      if (array == null) {
        result.set(key, [item.value]);
      } else {
        array.push(item.value);
      }
    }
    return result;
  }
}
