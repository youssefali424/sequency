import { AsyncSequence } from "./asyncSequence";

export class Contains {
  /**
   * Returns `true` if the sequence contains the given `element`.
   *
   * @param {T} element
   * @returns {Promise<boolean>}
   */
  async contains<T>(this: AsyncSequence<T>, element: T): Promise<boolean> {
    for await (let item of this.iterator) {
      if (element === item) {
        return true;
      }
    }
    return false;
  }
}
