import { AsyncSequence } from "./asyncSequence";

export class ForEach {
  /**
   * Performs the given `action` (side-effect) for each element of the sequence.
   *
   * @param {(T) => void} action
   */
  async forEach<T>(this: AsyncSequence<T>, action: (item: T) => void) {
    for await (let item of this.iterator) {
      action(item);
    }
  }
}
