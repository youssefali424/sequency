import { AsyncSequence } from "./asyncSequence";

export class FilterNotNull {

    /**
     * Returns a new sequence consisting of all non-null elements.
     *
     * @returns {Sequence<T>}
     */
    filterNotNull<T>(this: AsyncSequence<T | null>): AsyncSequence<T> {
        return this.filter(it => it !== null) as AsyncSequence<T>;
    }

}