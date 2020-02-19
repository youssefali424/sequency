import { isAsyncSequence } from "../Sequence";
import {
  AsyncSequence,
  asAsyncSequence,
  createAsyncSequence
} from "./asyncSequence";

class MergeIterator<T> implements AsyncIterableIterator<T> {
  iterator: Iterator<T>;
  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return this;
  }
  constructor(private readonly promise: Promise<Array<T>>) {}

  async next(value?: any): Promise<IteratorResult<T>> {
    if (!this.iterator) {
      const result = await this.promise;
      this.iterator = result[Symbol.iterator]();
    }
    return this.iterator.next();
  }
}

async function getArray<T, S>(
  sequence: AsyncSequence<T>,
  other: AsyncSequence<T> | AsyncIterableIterator<T>,
  selector: (value: T) => S,
  prependNewValues: boolean = false
): Promise<Array<T>> {
  let mergeValues = isAsyncSequence(other)
    ? await other.toArray()
    : await asAsyncSequence(other).toArray();
  const leftValues = await sequence.toArray();
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
    return [...mergeValues, ...result];
  } else {
    return [...result, ...mergeValues];
  }
}

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
  merge<T, S>(
    this: AsyncSequence<T>,
    other: AsyncSequence<T> | AsyncIterableIterator<T>,
    selector: (value: T) => S,
    prependNewValues: boolean = false
  ): AsyncSequence<T> {
    return createAsyncSequence(
      new MergeIterator(getArray(this, other, selector, prependNewValues))
    );
  }
}
