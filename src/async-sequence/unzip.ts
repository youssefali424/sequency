import { AsyncSequence } from "./asyncSequence";

export class Unzip {
  /**
   * Returns a pair of arrays where the first array contains all first values
   * and the second array all second values from each input pair of the sequence.
   *
   * @returns {[Array<T> , Array<S>]}
   */
  async unzip<T, S>(
    this: AsyncSequence<[T, S]>
  ): Promise<[Array<T>, Array<S>]> {
    const array1: Array<T> = [];
    const array2: Array<S> = [];
    for await (let item of this.iterator) {
      const [first, second] = item;
      array1.push(first);
      array2.push(second);
    }
    return [array1, array2];
  }
}
