import { AsyncSequence, createAsyncSequence } from "./asyncSequence";

class MapIterator<S, T> implements AsyncIterableIterator<T> {
  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return this;
  }
  constructor(
    private readonly transform: (item: S) => T,
    private readonly iterator: AsyncIterableIterator<S>
  ) {}

  async next(value?: any): Promise<IteratorResult<T>> {
    const item = await this.iterator.next();
    return item.done
      ? { done: true, value: undefined as any }
      : { done: false, value: this.transform(item.value) };
  }
}

export class Map {
  /**
   * Transforms each element into another value by applying the given `transform` function and returns a new sequence.
   *
   * @param {(T) => S} transform
   * @returns {AsyncSequence<S>}
   */
  map<S, T>(
    this: AsyncSequence<T>,
    transform: (element: T) => S
  ): AsyncSequence<S> {
    return createAsyncSequence(new MapIterator(transform, this.iterator));
  }
}
