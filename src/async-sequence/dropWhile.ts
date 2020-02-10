import { AsyncSequence, createAsyncSequence } from "./asyncSequence";

class DropWhileIterator<T> implements AsyncIterableIterator<T> {
  private dropping = true;
  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return this;
  }
  constructor(
    private readonly iterator: AsyncIterableIterator<T>,
    private readonly predicate: (item: T) => boolean
  ) {}

  async next(value?: any): Promise<IteratorResult<T>> {
    for await (let item of this.iterator) {
      if (!this.dropping) {
        return { done: false, value: item };
      }
      const result = this.predicate(item);
      if (!result) {
        this.dropping = false;
        return { done: false, value: item };
      }
    }
    return { done: true, value: undefined as any };
  }
}

export class DropWhile {
  /**
   * Drops all elements of the sequence as long as the given `predicate` evaluates to true.
   *
   * @param {(item: T) => boolean} predicate
   * @returns {AsyncSequence<T>}
   */
  dropWhile<T>(
    this: AsyncSequence<T>,
    predicate: (item: T) => boolean
  ): AsyncSequence<T> {
    return createAsyncSequence(new DropWhileIterator(this.iterator, predicate));
  }
}
