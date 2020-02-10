import Sequence from "../Sequence";
import {
  AsyncSequence,
  createAsyncSequenceFromIterator
} from "./asyncSequence";

export class ToAsyncSequence {
  /**
   * Transforms each element into another value by applying the given `transform` function and returns a new sequence.
   *
   * @returns {AsyncSequence<T>}
   */
  toAsyncSequence<T>(this: Sequence<T>): AsyncSequence<T> {
    return createAsyncSequenceFromIterator(this.iterator);
  }
}
