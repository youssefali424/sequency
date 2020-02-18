import { AsyncSequence } from "./asyncSequence";

export class OnEach {
  /**
   * Performs the given `action` for each element and returns the sequence.
   *
   * @param {(value: T) => void} action
   * @returns {Sequence<T>}
   */
  onEach<T>(
    this: AsyncSequence<T>,
    action: (value: T) => void
  ): AsyncSequence<T> {
    return this.map(it => {
      action(it);
      return it;
    });
  }
}
