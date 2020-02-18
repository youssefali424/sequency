import { AsyncSequence } from "./asyncSequence";

export class Partition {
  /**
   * Evaluates the given `predicate` for each element of the sequence and assorts each element into one of two lists
   * according to the result of the predicate. Returns both lists as an object.
   *
   * @param {(value: T) => boolean} predicate
   * @returns {{true: Array<T>; false: Array<T>}}
   */
  async partition<T>(
    this: AsyncSequence<T>,
    predicate: (value: T) => boolean
  ): Promise<{ true: Array<T>; false: Array<T> }> {
    const arrayTrue: Array<T> = [];
    const arrayFalse: Array<T> = [];
    for await (let item of this.iterator) {
      if (predicate(item)) {
        arrayTrue.push(item);
      } else {
        arrayFalse.push(item);
      }
    }
    return { true: arrayTrue, false: arrayFalse };
  }
}
