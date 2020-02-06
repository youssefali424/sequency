import { AsyncSequence } from "./asyncSequence";

export class Average {

    /**
     * Returns the average of all numbers of the sequence or `NaN` if the sequence is empty.
     *
     * @returns {Promise<number>}
     */
    async average(this: AsyncSequence<number>): Promise<number> {
        let sum = 0;
        let count = 0;
        for await(let item of this.iterator) {
            sum += item;
            count++;
        }
        return count === 0
            ? Number.NaN
            : sum / count;
    }

}