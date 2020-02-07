export default class GeneratorSeedIterator<T>
  implements AsyncIterableIterator<T> {
  private prevItem: T;
  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return this;
  }
  constructor(
    private readonly seed: T,
    private readonly nextFunction: (value: T) => T | null | undefined
  ) {}

  async next(value?: any): Promise<IteratorResult<T>> {
    if (this.prevItem == null) {
      this.prevItem = this.seed;
      return { done: false, value: this.seed };
    }
    const nextItem = this.nextFunction(this.prevItem);
    if (nextItem == null) {
      return { done: true, value: undefined as any };
    }
    this.prevItem = nextItem;
    return {
      done: false,
      value: nextItem!
    };
  }
}
