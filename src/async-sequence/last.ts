import { AsyncSequence } from "./asyncSequence";

export class Last {

    /**
     * Returns the last element of the sequence or the last element matching `predicate` if present, otherwise throws
     * an error.
     *
     * @param {(value: T) => boolean} predicate
     * @returns {Promise<T>}
     */
    async last<T>(this: AsyncSequence<T>, predicate?: (value: T) => boolean): Promise<T> {
        if (predicate != null) {
            return this.filter(predicate).last();
        }
        let result: T;
        let empty = true;
        for await(let item of this.iterator) {
            result = item;
            empty = false;
        }
        if (empty) {
            throw new Error("No such element");
        }
        return result!;
    }

}