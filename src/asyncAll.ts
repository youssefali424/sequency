import { AsyncSequence } from "./asyncSequence";

export class All {

    /**
     * Returns `true` if all elements match the given `predicate`.
     *
     * @param {(T) => boolean} predicate
     * @returns {Promise<boolean>}
     */
    async all<T>(this: AsyncSequence<T>, predicate: (item: T) => boolean): Promise<boolean> {
        for await(let item of this.iterator) {
            if (!predicate(item)) {
                return false;
            }
        }
        return true;
    }

}