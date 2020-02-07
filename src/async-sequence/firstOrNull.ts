import { AsyncSequence } from "./asyncSequence";

export class FirstOrNull {

    /**
     * Returns the first element of the sequence or the first element matching `predicate` if present, otherwise returns `null`.
     *
     * @param {(T) => boolean} predicate
     * @returns {T}
     */
    async firstOrNull<T>(this: AsyncSequence<T>, predicate?: (item: T) => boolean): Promise<T | null> {
        if (predicate != null) {
            return this.filter(predicate).firstOrNull();
        }
        const item = await this.iterator.next();
        return item.done
            ? null
            : item.value;
    }

    /**
     * Returns the first element of the sequence or the first element matching `predicate` if present, otherwise returns `null`.
     *
     * @param {(T) => boolean} predicate
     * @returns {T}
     */
    async find<T>(this: AsyncSequence<T>, predicate?: (item: T) => boolean): Promise<T | null>{
        return this.firstOrNull(predicate);
    }

}