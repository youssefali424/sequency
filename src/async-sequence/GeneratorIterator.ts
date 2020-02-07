export default class GeneratorIterator<T> implements AsyncIterableIterator<T> {
  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return this;
  }
  constructor(private readonly nextFunction: () => T | null | undefined) {}

  async next(value?: any): Promise<IteratorResult<T>> {
    const nextItem = this.nextFunction();
    return {
      done: nextItem == null,
      value: nextItem!
    };
  }
}
