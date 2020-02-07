import { AsyncSequence } from "./asyncSequence";

export class First {

    /**
     * Returns the first element of the sequence or the first element matching `predicate` if present, otherwise throws
     * an error.
     *
     * @param {(T) => boolean} predicate
     * @returns {T}
     */
    async first<T>(this: AsyncSequence<T>, predicate?: (item: T) => boolean): Promise<T> {
        if (predicate != null) {
            return this.filter(predicate).first();
        }
        const item = await this.iterator.next();
        if (item.done) {
            throw new Error("No such element");
        }
        return item.value;
    }

}