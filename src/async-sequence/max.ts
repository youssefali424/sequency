import { AsyncSequence } from "./asyncSequence";

export class Max {
  /**
   * Returns the maximum element of the sequence or `null` if sequence is empty.
   *
   * @returns {Promise<T | null>}
   */
  async max<T>(this: AsyncSequence<T>): Promise<T | null> {
    let result: T | null = null;
    for await (let item of this.iterator) {
      if (result == null || item > result) {
        result = item;
      }
    }
    return result;
  }
}
