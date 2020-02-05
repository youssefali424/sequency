import { Filter } from "./asyncFilter";
import { ToArray } from "./asyncToArray";
import { All } from "./asyncAll";
import { Any } from "./asyncAny";
import { AsIterable } from "./asAsyncIterable";
import { Associate } from "./asyncAssociate";
import { AssociateBy } from "./asyncAssociateBy";
import { Average } from "./average";
import { Chunk } from "./chunk";
import { Contains } from "./contains";

export interface AsyncSequenceOperators<T> extends Filter, ToArray,All,Any,AsIterable,Associate,AssociateBy<T>,Average,Chunk,Contains {}
export interface AsyncSequence<T> extends AsyncSequenceOperators<T> {
  readonly iterator: AsyncIterableIterator<T>;
}
class AsyncSequenceImpl<T> {
  constructor(readonly iterator: AsyncIterableIterator<T>) {}
}

applyMixins(AsyncSequenceImpl, [Filter, ToArray,All,Any,AsIterable,Associate,AssociateBy,Average,Chunk,Contains]);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}
export function asAsyncSequence<T>(
  iterable: AsyncIterableIterator<T>
): AsyncSequence<T> {
  if (iterable === null) {
    throw new Error("Cannot create sequence for input: null");
  }
  if (iterable === undefined) {
    throw new Error("Cannot create sequence for input: undefined");
  }
  if (iterable[Symbol.asyncIterator] == null) {
    throw new Error(
      "Cannot create sequence for non-iterable input: " + iterable
    );
  }
  const iterator: AsyncIterableIterator<T> = iterable[Symbol.asyncIterator]();
  return createAsyncSequence<T>(iterator);
}
export function createAsyncSequence<T>(
  iterator: AsyncIterableIterator<T>
): AsyncSequence<T> {
  return new AsyncSequenceImpl(iterator) as any;
}
