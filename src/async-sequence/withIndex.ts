// import {c} from "../Sequence";
import IndexedValue from "../IndexedValue";
import { AsyncSequence, createAsyncSequence } from "./asyncSequence";

class IndexIterator<T> implements AsyncIterableIterator<IndexedValue<T>> {
  private index = -1;

  [Symbol.asyncIterator](): AsyncIterableIterator<IndexedValue<T>> {
    return this;
  }
  constructor(private readonly iterator: AsyncIterableIterator<T>) {}

  async next(value?: any): Promise<IteratorResult<IndexedValue<T>>> {
    const item = await this.iterator.next();
    if (item.done) {
      return { done: true, value: undefined as any };
    }
    this.index++;
    return {
      done: false,
      value: {
        index: this.index,
        value: item.value
      }
    };
  }
}

export class WithIndex {
  /**
   * Returns a new sequence consisting of indexed values for all original elements.
   *
   * @returns {AsyncSequence<IndexedValue<T>>}
   */
  withIndex<T>(this: AsyncSequence<T>): AsyncSequence<IndexedValue<T>> {
    return createAsyncSequence(new IndexIterator(this.iterator));
  }
}
