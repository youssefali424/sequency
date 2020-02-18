import { AsyncSequence } from "./asyncSequence";

export class None {
  /**
   * Returns `true` if no element match the given `predicate` or if the sequence is empty
   * if no predicate is present.
   *
   * @param {(value: T) => boolean} predicate
   * @returns {Promise<boolean | undefined>}
   */
  async none<T>(
    this: AsyncSequence<T>,
    predicate?: (value: T) => boolean
  ): Promise<boolean | undefined> {
    if (predicate == null) {
      return (await this.iterator.next()).done;
    }
    for await (let item of this.iterator) {
      if (predicate(item)) {
        return false;
      }
    }
    return true;
  }
}
