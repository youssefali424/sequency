import { isAsyncSequence } from "../Sequence";
import { AsyncSequence, createAsyncSequence } from "./asyncSequence";

class MinusIterator<T> implements AsyncIterableIterator<T> {
  array: Array<T>;
  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return this;
  }
  constructor(
    private readonly promise: Promise<Array<T>>,
    private readonly iterator: AsyncIterableIterator<T>
  ) {}

  async next(value?: any): Promise<IteratorResult<T>> {
    if (!this.array) {
      this.array = await this.promise;
    }
    for await (let item of this.iterator) {
      if (this.array.indexOf(item) < 0) {
        return { done: false, value: item };
      }
    }
    return { done: true, value: undefined as any };
  }
}

async function getArray<T>(data: AsyncSequence<T>): Promise<Array<T>> {
  return await data.toArray();
}
export class Minus {
  /**
   * Removes the given `data` and returns a new sequence. Data can either be a single element, an array of elements
   * or a sequence of elements.
   *
   * @param {AsyncSequence<T> | Array<T> | T} data
   * @returns {AsyncSequence<T>}
   */
  minus<T>(
    this: AsyncSequence<T>,
    data: T | AsyncSequence<T> | Array<T>
  ): AsyncSequence<T> {
    if (isAsyncSequence(data)) {
      return createAsyncSequence(
        new MinusIterator(getArray(data), this.iterator)
      );
    } else if (data instanceof Array) {
      return this.filter(it => data.indexOf(it) < 0);
    } else {
      return this.filter(it => it !== data);
    }
  }
}
