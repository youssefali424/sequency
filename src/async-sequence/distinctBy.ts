import { AsyncSequence, createAsyncSequence } from "./asyncSequence";

class DistinctByIterator<T, K> implements AsyncIterableIterator<T> {
  private keys: Array<K> = [];

  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return this;
  }
  constructor(
    private readonly iterator: AsyncIterableIterator<T>,
    private readonly selector: (item: T) => K
  ) {}

  async next(value?: any): Promise<IteratorResult<T>> {
    for await (let item of this.iterator) {
      const key = this.selector(item);
      if (this.keys.indexOf(key) < 0) {
        this.keys.push(key);
        return { done: false, value: item };
      }
    }
    return { done: true, value: undefined as any };
  }
}

export class DistinctBy {
  /**
   * Returns a new sequence which discards all elements with duplicate items determined
   * by the given `selector`.
   *
   * @param {(item: T) => K} selector
   * @returns {AsyncSequence<T>}
   */
  distinctBy<T, K>(
    this: AsyncSequence<T>,
    selector: (item: T) => K
  ): AsyncSequence<T> {
    return createAsyncSequence(new DistinctByIterator(this.iterator, selector));
  }
}
