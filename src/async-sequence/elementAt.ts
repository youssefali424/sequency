import { AsyncSequence } from "./asyncSequence";

export class ElementAt {
  /**
   * Returns the element at position `index` (zero-based) or throws an error if `index`
   * is out of bounds.
   *
   * @param {number} index
   * @returns {Promise<T>}
   */
  async elementAt<T>(this: AsyncSequence<T>, index: number): Promise<T> {
    let i = 0;
    for await (let item of this.iterator) {
      if (i === index) {
        return item;
      }
      i++;
    }
    throw new Error("Index out of bounds: " + index);
  }
}
