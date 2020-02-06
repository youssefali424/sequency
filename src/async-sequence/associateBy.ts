import { AsyncSequence } from "./asyncSequence";

export class AssociateBy<T> {
  /**
   * Returns a map consisting of the elements mapped by the given `keySelector`.
   *
   * @param {(value: T) => K} keySelector
   * @returns {Promise<Map<K, T>>}
   */
  associateBy<K>(keySelector: (value: T) => K): Promise<Map<K, T>>;

  /**
   * Returns a map consisting of the elements indexed by the given `key`.
   *
   * @param {K} key
   * @returns {Promise<Map<T[K], T>>}
   */
  associateBy<K extends keyof T>(key: K): Promise<Map<T[K], T>>;

  /**
   * Returns a map consisting of the elements mapped by the given `keySelector`. The value
   * is transformed into another value by the `valueTransformer`.
   *
   * @param {(value: T) => K} keySelector
   * @param {(value: T) => V} valueTransformer
   * @returns {Promise<Map<K, V>>}
   */
  associateBy<K, V>(
    keySelector: (value: T) => K,
    valueTransformer: (value: T) => V
  ): Promise<Map<K, V>>;

  /**
   * Returns a map consisting of the elements indexed by the given `key`. The value
   * is transformed into another value by the `valueTransformer`.
   *
   * @param {K} key
   * @param {(value: T) => V} valueTransformer
   * @returns {Promise<Map<K, V>>}
   */
  associateBy<K extends keyof T, V>(
    key: K,
    valueTransformer: (value: T) => V
  ): Promise<Map<T[K], V>>;

  async associateBy<T, K, V>(
    this: AsyncSequence<T>,
    keyOrSelector: any,
    valueTransform?: (value: T) => V
  ): Promise<Map<K, V | T>> {
    const selector =
      typeof keyOrSelector === "function"
        ? keyOrSelector
        : (value: T) => value[keyOrSelector as keyof T];
    const result = new Map<K, V | T>();
    const transform =
      valueTransform != null ? valueTransform : (value: T) => value;
    for await (let item of this.iterator) {
      const key = selector(item);
      const value = transform(item);
      result.set(key, value);
    }
    return result;
  }
}
