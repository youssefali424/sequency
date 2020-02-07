import { AsyncSequence } from "./asyncSequence";

export class ElementAtOrElse {
  /**
   * Returns the element at position `index` (zero-based). If `index` is out of bounds returns
   * the result of the given `defaultValue` function.
   *
   * @param {number} index
   * @param defaultValue
   * @returns { Promise<T> }
   */
  async elementAtOrElse<T>(
    this: AsyncSequence<T>,
    index: number,
    defaultValue: (index: number) => T
  ): Promise<T> {
    let i = 0;
    for await (let item of this.iterator) {
      if (i === index) {
        return item;
      }
      i++;
    }
    return defaultValue(index);
  }
}
