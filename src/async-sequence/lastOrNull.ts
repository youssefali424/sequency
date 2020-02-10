import { AsyncSequence } from "./asyncSequence";

export class LastOrNull {
  /**
   * Returns the last element of the sequence or the last element matching `predicate` if present, otherwise returns `null`.
   *
   * @param {(value: T) => boolean} predicate
   * @returns {Promise<T | null>}
   */
  async lastOrNull<T>(
    this: AsyncSequence<T>,
    predicate?: (value: T) => boolean
  ): Promise<T | null> {
    if (predicate != null) {
      return await this.filter(predicate).lastOrNull();
    }
    let result: T | null = null;
    for await (let item of this.iterator) {
      result = item;
    }
    return result;
  }

  /**
   * Returns the last element of the sequence or the last element matching `predicate` if present, otherwise returns `null`.
   *
   * @param {(value: T) => boolean} predicate
   * @returns {Promise<T | null>}
   */
  async findLast<T>(
    this: AsyncSequence<T>,
    predicate?: (value: T) => boolean
  ): Promise<T | null> {
    return this.lastOrNull(predicate);
  }
}
