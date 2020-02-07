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
import { ElementAt } from "./elementAt";
import { ElementAtOrElse } from "./elementAtOrElse";
import { ElementAtOrNull } from "./elementAtOrNull";
import { FilterIndexed } from "./filterIndexed";
import { FilterNot } from "./filterNot";
import { FilterNotNull } from "./filterNotNull";
import { First } from "./first";
import { FirstOrNull } from "./firstOrNull";
import { FlatMap } from "./flatMap";
import { Flatten } from "./flatten";
import { Last } from "./last";
import { LastOrNull } from "./lastOrNull";
import { asyncSequenceOf } from "../Sequence";
import { Fold } from "./fold";
import { FoldIndexed } from "./foldIndexed";
import { ForEach } from "./forEach";
import { ForEachIndexed } from "./forEachIndexed";

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
    Drop,
    ElementAt,
    ElementAtOrElse,
    ElementAtOrNull,
    FilterIndexed,
    FilterNot,
    FilterNotNull,
    First,
    FirstOrNull,
    FlatMap,
    Flatten,
    Last,
    LastOrNull,
    Fold,
    FoldIndexed,
    ForEach,
    ForEachIndexed {}
export interface AsyncSequence<T> extends AsyncSequenceOperators<T> {
  readonly iterator: AsyncIterableIterator<T>;
}
export class AsyncSequenceImpl<T> {
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
  Drop,
  ElementAt,
  ElementAtOrElse,
  ElementAtOrNull,
  FilterIndexed,
  FilterNot,
  FilterNotNull,
  First,
  FirstOrNull,
  FlatMap,
  Flatten,
  Last,
  LastOrNull,
  Fold,
  FoldIndexed,
  ForEach,
  ForEachIndexed
]);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}
export function asAsyncSequence<T>(
  iterable: AsyncIterableIterator<T> | Array<T>
): AsyncSequence<T> {
  let asyncIterable: AsyncIterableIterator<T>;
  if (iterable instanceof Array) {
    asyncIterable = {
      [Symbol.asyncIterator]: function() {
        return this;
      },
      next: async function(): Promise<IteratorResult<T>> {
        if (iterable.length) {
          return Promise.resolve({
            value: iterable.shift() as T,
            done: false
          });
        } else {
          return Promise.resolve({
            value: undefined as any,
            done: true
          });
        }
      }
    };
  } else {
    asyncIterable = iterable;
  }
  if (asyncIterable === null) {
    throw new Error("Cannot create sequence for input: null");
  }
  if (asyncIterable === undefined) {
    throw new Error("Cannot create sequence for input: undefined");
  }
  if (asyncIterable[Symbol.asyncIterator] == null) {
    throw new Error(
      "Cannot create sequence for non-iterable input: " + iterable
    );
  }
  const iterator: AsyncIterableIterator<T> = asyncIterable[
    Symbol.asyncIterator
  ]();
  return createAsyncSequence<T>(iterator);
}
export function createAsyncSequence<T>(
  iterator: AsyncIterableIterator<T>
): AsyncSequence<T> {
  return new AsyncSequenceImpl(iterator) as any;
}
