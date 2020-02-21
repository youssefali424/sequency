import { AsyncSequence } from "./asyncSequence";

export class ToMap {
  /**
   * Returns a map consisting of each key-value pair. If a `map` is passed
   * the pairs are set on this map. Duplicate keys override each other.
   *
   * @param {Map<K, V>} map
   * @returns {Promise<Map<K, V>>}
   */
  async toMap<K, V>(
    this: AsyncSequence<[K, V]>,
    map?: Map<K, V>
  ): Promise<Map<K, V>> {
    const result = map || new Map<K, V>();
    for await (let item of this.iterator) {
      const pair = item;
      const key = pair[0];
      const value = pair[1];
      result.set(key, value);
    }
    return result;
  }
}
