import { AsyncSequence, createAsyncSequence } from "./asyncSequence";

class FilterIterator<T> implements AsyncIterableIterator<T> {
  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return this;
  }
  constructor(
    private readonly predicate: (item: T) => boolean,
    private readonly iterator: AsyncIterableIterator<T>
  ) {}

  async next(value?: any): Promise<IteratorResult<T>> {
    for await (let item of this.iterator) {
      if (this.predicate(item)) {
        return { done: false, value: item };
      }
    }
    return { done: true, value: undefined as any };
  }
}

export class Filter {
  /**
   * Returns a new sequence consisting of all elements that match the given `predicate`.
   *
   * @param {(T) => boolean} predicate
   * @returns {AsyncSequence<T>}
   */
  filter<T>(
    this: AsyncSequence<T>,
    predicate: (item: T) => boolean
  ): AsyncSequence<T> {
    return createAsyncSequence(new FilterIterator(predicate, this.iterator));
  }
}
