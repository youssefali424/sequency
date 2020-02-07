import { AsyncSequence,createAsyncSequence } from "./asyncSequence";

class FlatMapIterator<S, T> implements AsyncIterableIterator<T> {
    private current: AsyncIterableIterator<T> | undefined;
    [Symbol.asyncIterator](): AsyncIterableIterator<T> {
        return this;
    }
    constructor(private readonly transform: (item: S) => AsyncSequence<T>,
                private readonly iterator: AsyncIterableIterator<S>) {
    }

    async next(value?: any): Promise<IteratorResult<T>> {
        if (this.current != null) {
            const item = await this.current.next();
            if (!item.done) {
                return item;
            }
        }
        const next = await this.iterator.next();
        if (!next.done) {
            const sequence = this.transform(next.value);
            this.current = sequence.iterator;
            return await this.next();
        }
        return {done: true, value: undefined as any};
    }
}

export class FlatMap {

    /**
     * Transforms each element into a sequence of items and returns a flat single sequence of all those items.
     *
     * @param {(value: S) => Sequence<T>} transform
     * @returns {Sequence<T>}
     */
    flatMap<S, T>(this: AsyncSequence<S>, transform: (value: S) => AsyncSequence<T>): AsyncSequence<T> {
        return createAsyncSequence(new FlatMapIterator(transform, this.iterator));
    }

}