import { AsyncSequence } from "./asyncSequence";

export class Take {

    /**
     * Returns a new sequence consisting of the first `n` elements. All other elements
     * are discarded.
     *
     * @param {number} n
     * @returns {Sequence<T>}
     */
    take<T>(this: AsyncSequence<T>, n: number): AsyncSequence<T> {
        return this.withIndex()
            .takeWhile(it => it.index < n)
            .map(it => it.value);
    }

}