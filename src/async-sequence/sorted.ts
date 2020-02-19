import {
  AsyncSequence,
  createAsyncSequence,
  createAsyncIterable
} from "./asyncSequence";

import ComparatorFactory from "../ComparatorFactory";
import Comparator from "../Comparator";
import createComparatorFactory from "../createComparatorFactory";

class SortIterator<T> implements AsyncIterableIterator<T> {
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
async function sort<T>(
  sequence: AsyncSequence<T>,
  composeComparator?: (factory: ComparatorFactory<T>) => Comparator<T>
): Promise<Array<T>> {
  const result: Array<T> = [];
  for await (let item of sequence.iterator) {
    result.push(item);
  }
  if (composeComparator == null) {
    result.sort();
  } else {
    const factory: ComparatorFactory<T> = createComparatorFactory<T>();
    const comparator = composeComparator(factory);
    result.sort(comparator);
  }
  return result;
}
export class Sorted {
  /**
   * Returns a new sequence with all elements sorted by the comparator specified by the given `composeComparator` function
   * or in natural order if no arguments are given.
   *
   * @returns {AsyncSequence<T>}
   */
  sorted<T>(
    this: AsyncSequence<T>,
    composeComparator?: (factory: ComparatorFactory<T>) => Comparator<T>
  ): AsyncSequence<T> {
    return createAsyncSequence(new SortIterator(sort(this, composeComparator)));
  }
}
