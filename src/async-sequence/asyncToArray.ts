import { AsyncSequence } from "./asyncSequence";

export class ToArray {
  /**
   * Returns all elements of the sequence as array. If an `array` is passed
   * the elements are appended to the end of the array.
   *
   * @param {Array<T>} array
   * @returns {Promise<Array<T>>}
   */
  async toArray<T>(
    this: AsyncSequence<T>,
    array?: Array<T>
  ): Promise<Array<T>> {
    const result: Array<T> = array || [];
    for await (let item of this.iterator) {
      result.push(item);
    }
    return result;
  }

  /**
   * Returns all elements of the sequence as array. If an `array` is passed
   * the elements are appended to the end of the array.
   *
   * @param {Array<T>} array
   * @returns {Array<T>}
   */
  async toList<T>(this: AsyncSequence<T>, array?: Array<T>): Promise<Array<T>> {
    return await this.toArray(array);
  }
}
