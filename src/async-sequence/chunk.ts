import { AsyncSequence } from "./asyncSequence";

export class Chunk {
  /**
   * Splits the elements of the sequence into arrays which length is determined by
   * the given `chunkSize` and returns all chunks as array.
   *
   * @param {number} chunkSize
   * @returns {Promise<Array<Array<T>>>}
   */
  async chunk<T>(
    this: AsyncSequence<T>,
    chunkSize: number
  ): Promise<Array<Array<T>>> {
    if (chunkSize < 1) {
      throw new Error("chunkSize must be > 0 but is " + chunkSize);
    }
    const result: Array<Array<T>> = [];
    let index = 0;
    for await (let item of this.iterator) {
      const chunkIndex = Math.floor(index / chunkSize);
      if (result[chunkIndex] == null) {
        result[chunkIndex] = [item];
      } else {
        result[chunkIndex].push(item);
      }
      index++;
    }
    return result;
  }
}
