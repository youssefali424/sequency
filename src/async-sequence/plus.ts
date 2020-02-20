import { isAsyncSequence } from "../Sequence";
import {
  AsyncSequence,
  createAsyncSequence,
  createAsyncIterable
} from "./asyncSequence";

class AppendIterator<T> implements AsyncIterableIterator<T> {
  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return this;
  }
  constructor(
    private readonly first: AsyncIterableIterator<T>,
    private readonly second: AsyncIterableIterator<T>
  ) {}

  async next(value?: any): Promise<IteratorResult<T>> {
    const item1 = await this.first.next();
    if (!item1.done) {
      return { done: false, value: item1.value };
    }
    const item2 = await this.second.next();
    if (!item2.done) {
      return { done: false, value: item2.value };
    }
    return { done: true, value: undefined as any };
  }
}

export class Plus {
  /**
   * Appends the given `element` to the end of the sequence and returns a new sequence.
   *
   * @param {T} element
   * @returns {Sequence<T>}
   */
  plus<T>(this: AsyncSequence<T>, element: T): AsyncSequence<T>;

  /**
   * Appends the given array to the end of the sequence and returns a new sequence.
   *
   * @param {Array<T>} other
   * @returns {Sequence<T>}
   */
  plus<T>(this: AsyncSequence<T>, other: Array<T>): AsyncSequence<T>;

  /**
   * Appends the given sequence to the end of the sequence and returns a new sequence.
   *
   * @param {AsyncSequence<T>} other
   * @returns {AsyncSequence<T>}
   */
  plus<T>(this: AsyncSequence<T>, other: AsyncSequence<T>): AsyncSequence<T>;

  plus<T>(
    this: AsyncSequence<T>,
    data: T | AsyncSequence<T> | Array<T>
  ): AsyncSequence<T> {
    if (isAsyncSequence(data)) {
      return createAsyncSequence(
        new AppendIterator(this.iterator, data.iterator)
      );
    } else if (data instanceof Array) {
      const iterator = createAsyncIterable(data[Symbol.iterator]());

      return createAsyncSequence(new AppendIterator(this.iterator, iterator));
    } else {
      const iterator = createAsyncIterable([data][Symbol.iterator]());
      return createAsyncSequence(new AppendIterator(this.iterator, iterator));
    }
  }
}
