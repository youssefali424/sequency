import { isAsyncSequence } from "../Sequence";
import { AsyncSequence, asAsyncSequence } from "./asyncSequence";

export class Merge {
  /**
   * Merges the elements of both sequences into a new sequence. Each element of this sequence is eventually replaced with
   * an element of the other sequence by comparing results of the given `selector` function. If no value is found in the other
   * sequence the element is retained. New elements of the other sequence are appended to the end of the new sequence or
   * prepended to the start of the new sequence, if `prependNewValues` is set to `true`. This operation is not lazy evaluated.
   *
   * @param {AsyncSequence<T>} other
   * @param {(value: T) => S} selector
   * @param prependNewValues
   * @returns {Promise<AsyncSequence<T>>}
   */
  async merge<T, S>(
    this: AsyncSequence<T>,
    other: AsyncSequence<T> | AsyncIterableIterator<T>,
    selector: (value: T) => S,
    prependNewValues: boolean = false
  ): Promise<AsyncSequence<T>> {
    let mergeValues = isAsyncSequence(other)
      ? await other.toArray()
      : await asAsyncSequence(other).toArray();
    const leftValues = await this.toArray();
    const promises = leftValues.map(async left => {
      const selected = selector(left);
      const right = await asAsyncSequence(mergeValues).find(
        it => selector(it) === selected
      );
      if (right != null) {
        mergeValues = mergeValues.filter(it => it !== right);
        return right;
      } else {
        return left;
      }
    });
    const result = await Promise.all(promises);
    if (prependNewValues) {
      return asAsyncSequence([...mergeValues, ...result]);
    } else {
      return asAsyncSequence([...result, ...mergeValues]);
    }
  }
}
