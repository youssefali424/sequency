import { AsyncSequence } from "./asyncSequence";

export class ElementAtOrNull {

    /**
     * Returns the element at position `index` (zero-based) or `null` if `index`
     * is out of bounds.
     *
     * @param {number} index
     * @returns {T}
     */
    async elementAtOrNull<T>(this: AsyncSequence<T>, index: number): Promise<T | null>{
        let i = 0;
        for await (let item of this.iterator) {
            if (i === index) {
                return item;
            }
            i++;
        }
        return null;
    }

}