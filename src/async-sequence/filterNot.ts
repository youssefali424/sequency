import { AsyncSequence } from "./asyncSequence";

export class FilterNot {

    /**
     * Returns a new sequence consisting of all elements that don't match the given `predicate`.
     *
     * @param {(value: T) => boolean} predicate
     * @returns {Sequence<T>}
     */
    filterNot<T>(this: AsyncSequence<T>, predicate: (value: T) => boolean): AsyncSequence<T> {
        return this.filter((value: T) => !predicate(value));
    }

}