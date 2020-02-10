import { AsyncSequence, createAsyncSequence } from "./asyncSequence";

class TakeWhileIterator<T> implements AsyncIterableIterator<T> {
  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return this;
  }
  constructor(
    private readonly iterator: AsyncIterableIterator<T>,
    private readonly predicate: (item: T) => boolean
  ) {}

  async next(value?: any): Promise<IteratorResult<T>> {
    const item = await this.iterator.next();
    if (!item.done) {
      const result = this.predicate(item.value);
      if (result) {
        return { done: false, value: item.value };
      }
    }
    return { done: true, value: undefined as any };
  }
}

export class TakeWhile {
  /**
   * Takes all elements of the sequence as long as the given `predicate` evaluates to true.
   *
   * @param {(item: T) => boolean} predicate
   * @returns {AsyncSequence<T>}
   */
  takeWhile<T>(
    this: AsyncSequence<T>,
    predicate: (item: T) => boolean
  ): AsyncSequence<T> {
    return createAsyncSequence(new TakeWhileIterator(this.iterator, predicate));
  }
}
