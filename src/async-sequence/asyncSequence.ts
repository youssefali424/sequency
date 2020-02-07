import { Filter } from "./filter";
import { ToArray } from "./toArray";
import { All } from "./all";
import { Any } from "./any";
import { AsIterable } from "./asIterable";
import { Associate } from "./associate";
import { AssociateBy } from "./associateBy";
import { Average } from "./average";
import { Chunk } from "./chunk";
import { Contains } from "./contains";
import { Count } from "./count";
import { Distinct } from "./distinct";
import { DistinctBy } from "./distinctBy";
import { WithIndex } from "./withIndex";
import { DropWhile } from "./dropWhile";
import { Map } from "./map";
import { Drop } from "./drop";

export interface AsyncSequenceOperators<T>
  extends Filter,
    ToArray,
    All,
    Any,
    AsIterable,
    Associate,
    AssociateBy<T>,
    Average,
    Chunk,
    Contains,
    Count,
    Distinct,
    DistinctBy,
    WithIndex,
    DropWhile,
    Map,
    Drop {}
export interface AsyncSequence<T> extends AsyncSequenceOperators<T> {
  readonly iterator: AsyncIterableIterator<T>;
}
class AsyncSequenceImpl<T> {
  constructor(readonly iterator: AsyncIterableIterator<T>) {}
}

applyMixins(AsyncSequenceImpl, [
  Filter,
  ToArray,
  All,
  Any,
  AsIterable,
  Associate,
  AssociateBy,
  Average,
  Chunk,
  Contains,
  Count,
  Distinct,
  DistinctBy,
  WithIndex,
  DropWhile,
  Map,
  Drop
]);

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
