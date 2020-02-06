import { AsyncSequence } from "./asyncSequence";

export class Count {

    /**
     * Returns the number of elements of this sequence. If `predicate` is present, returns
     * the number of elements matching the given `predicate`.
     *
     * @param {(T) => boolean} predicate
     * @returns {Promise<number>}
     */
    async count<T>(this: AsyncSequence<T>, predicate?: (item: T) => boolean): Promise<number> {
        let num = 0;
        if (predicate == null) {
            for await (let item of this.iterator) {
                num++;
            }
        } else {
            for await (let item of this.iterator) {
                if (predicate(item)) {
                    num++;
                }
            }
        }
        return num;
    }

}