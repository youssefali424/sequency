import { AsyncSequence } from "./asyncSequence";

export class Any {

    /**
     * Returns `true` if at least one element match the given `predicate`.
     *
     * @param {(T) => boolean} predicate
     * @returns {Promise<boolean>}
     */
    async any<T>(this: AsyncSequence<T>, predicate?: (item: T) => boolean): Promise<boolean> {
        if (predicate == null) {
            return !(await this.iterator.next()).done;
        }
        for await(let item of this.iterator) {
            if (predicate(item)) {
                return true;
            }
        }
        return false;
    }

}