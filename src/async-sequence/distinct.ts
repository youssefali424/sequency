import { AsyncSequence, createAsyncSequence } from "./asyncSequence";

class DistinctIterator<T> implements AsyncIterableIterator<T> {
  private items: Array<T> = [];

  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return this;
  }
  constructor(private readonly iterator: AsyncIterableIterator<T>) {}

  async next(value?: any): Promise<IteratorResult<T>> {
    for await (let item of this.iterator) {
      if (this.items.indexOf(item) < 0) {
        this.items.push(item);
        return { done: false, value: item };
      }
    }
    return { done: true, value: undefined as any };
  }
}

export class Distinct {
  /**
   * Returns a new sequence which discards all duplicate elements.
   *
   * @returns {AsyncSequence<T>}
   */
  distinct<T>(this: AsyncSequence<T>): AsyncSequence<T> {
    return createAsyncSequence(new DistinctIterator(this.iterator));
  }
}
