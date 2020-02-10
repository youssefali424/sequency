import { AsyncSequence } from "./asyncSequence";

export class ForEachIndexed {
  /**
   * Performs the given `action` (side-effect) for each element of the sequence and passes the `index` of the current
   * element (zero-based).
   *
   * @param {(index: number, value: T) => void} action
   */
  async forEachIndexed<T>(
    this: AsyncSequence<T>,
    action: (index: number, value: T) => void
  ) {
    await this.withIndex().forEach(it => action(it.index, it.value));
  }
}
