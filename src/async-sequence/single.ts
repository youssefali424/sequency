import { AsyncSequence } from "./asyncSequence";

export class Single {
  /**
   * Returns the single element of the sequence or throws error if the sequence has more than
   * one element or none at all. If a `predicate` is passed returns the single element matching
   * the predicate or throws an error if more or less than one element match the predicate.
   *
   * @param {(value: T) => boolean} predicate
   * @returns {Promise<T>}
   */
  async single<T>(
    this: AsyncSequence<T>,
    predicate?: (value: T) => boolean
  ): Promise<T> {
    if (predicate != null) {
      return this.filter(predicate).single();
    }
    const first = await this.iterator.next();
    if (first.done) {
      throw new Error("No such element");
    }
    if (!(await this.iterator.next()).done) {
      throw new Error("Expect single element");
    }
    return first.value;
  }
}
