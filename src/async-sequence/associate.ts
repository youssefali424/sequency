import { AsyncSequence } from "./asyncSequence";

export class Associate {
  /**
   * Transforms each element into a key-value pair and returns the results as map. In case of
   * duplicate keys the last key-value pair overrides the other.
   *
   * @param {(value: T) => [K , V]} transform
   * @returns {Promise<Map<K, V>>
   */
  async associate<T, K, V>(
    this: AsyncSequence<T>,
    transform: (value: T) => [K, V]
  ): Promise<Map<K, V>> {
    const result = new Map<K, V>();
    for await (let item of this.iterator) {
      const pair = transform(item);
      result.set(pair[0], pair[1]);
    }
    return result;
  }
}
