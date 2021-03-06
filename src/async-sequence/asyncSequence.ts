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
import { Fold } from "./fold";
import { FoldIndexed } from "./foldIndexed";
import { ForEach } from "./forEach";
import { ForEachIndexed } from "./forEachIndexed";
import { Take } from "./take";
import { TakeWhile } from "./takeWhile";
import { GroupBy } from "./groupBy";
import { IndexOf } from "./indexOf";
import { IndexOfFirst } from "./indexOfFirst";
import { IndexOfLast } from "./indexOfLast";
import { JoinToString } from "./joinToString";
import { MapIndexed } from "./mapIndexed";
import { MapNotNull } from "./mapNotNull";
import { Max } from "./max";
import { MaxBy } from "./maxBy";
import { MaxWith } from "./maxWith";
import { Merge } from "./merge";
import { Min } from "./min";
import { MinBy } from "./minBy";
import { MinWith } from "./minWith";
import { Minus } from "./minus";
import { None } from "./none";
import { OnEach } from "./onEach";
import { Partition } from "./partition";
import { Plus } from "./plus";
import { Reduce } from "./reduce";
import { ReduceIndexed } from "./reduceIndexed";
import { Reverse } from "./reverse";
import { Sorted } from "./sorted";
import { SortedBy } from "./sortedBy";
import { SortedByDescending } from "./sortedByDescending";
import { SortedDescending } from "./sortedDescending";
import { SortedWith } from "./sortedWith";
import { Single } from "./single";
import { SingleOrNull } from "./singleOrNull";
import { Sum } from "./sum";
import { SumBy } from "./sumBy";
import { Zip } from "./zip";
import { Unzip } from "./unzip";
import { ToMap } from "./toMap";
import { ToSet } from "./toSet";

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
    ForEachIndexed,
    Take,
    TakeWhile,
    GroupBy,
    IndexOf,
    IndexOfFirst,
    IndexOfLast,
    JoinToString,
    MapIndexed,
    MapNotNull,
    Max,
    MaxBy,
    MaxWith,
    Merge,
    Min,
    MinBy,
    MinWith,
    Minus,
    None,
    OnEach,
    Partition,
    Plus,
    Reduce,
    ReduceIndexed,
    Reverse,
    Single,
    SingleOrNull,
    Sorted,
    SortedBy,
    SortedByDescending,
    SortedDescending,
    SortedWith,
    Sum,
    SumBy,
    Zip,
    Unzip,
    ToMap,
    ToSet {}
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
  ForEachIndexed,
  Take,
  TakeWhile,
  GroupBy,
  IndexOf,
  IndexOfFirst,
  IndexOfLast,
  JoinToString,
  MapIndexed,
  MapNotNull,
  Max,
  MaxBy,
  MaxWith,
  Merge,
  Min,
  MinBy,
  MinWith,
  Minus,
  None,
  OnEach,
  Partition,
  Plus,
  Reduce,
  ReduceIndexed,
  Reverse,
  Single,
  SingleOrNull,
  Sorted,
  SortedBy,
  SortedByDescending,
  SortedDescending,
  SortedWith,
  Sum,
  SumBy,
  Zip,
  Unzip,
  ToMap,
  ToSet
]);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}
export function asAsyncSequence<T>(iterable: Iterable<T>): AsyncSequence<T>;
export function asAsyncSequence<T>(
  iterable: AsyncIterableIterator<T>
): AsyncSequence<T>;
export function asAsyncSequence<T>(
  iterable: AsyncIterableIterator<T> | Iterable<T>
): AsyncSequence<T> {
  let asyncIterable: AsyncIterableIterator<T>;
  if (!isAsyncIterableIterator(iterable)) {
    let iterator: Iterator<T> = createIterator(iterable);
    asyncIterable = createAsyncIterable(iterator);
  } else {
    asyncIterable = iterable;
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
export function isAsyncIterableIterator<T>(
  object: any
): object is AsyncIterableIterator<T> {
  return (object as AsyncIterableIterator<T>)[Symbol.asyncIterator]
    ? true
    : false;
}

export function createIterator<T>(iterable: Iterable<T>): Iterator<T> {
  if (iterable === null) {
    throw new Error("Cannot create sequence for input: null");
  }
  if (iterable === undefined) {
    throw new Error("Cannot create sequence for input: undefined");
  }
  if (iterable[Symbol.iterator] == null) {
    throw new Error(
      "Cannot create sequence for non-iterable input: " + iterable
    );
  }
  return iterable[Symbol.iterator]();
}
export function createAsyncIterable<T>(
  iterator: Iterator<T>
): AsyncIterableIterator<T> {
  return {
    [Symbol.asyncIterator]: function() {
      return this;
    },
    async next(): Promise<IteratorResult<T>> {
      let item = iterator.next();
      if (!item.done) {
        return Promise.resolve({
          value: item.value,
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
}
export function createAsyncSequenceFromIterator<T>(
  iterator: Iterator<T>
): AsyncSequence<T> {
  let asyncIterable = createAsyncIterable(iterator);
  if (asyncIterable[Symbol.asyncIterator] == null) {
    throw new Error(
      "Cannot create async sequence for non-iterable input: " + iterator
    );
  }
  const asyncIterator: AsyncIterableIterator<T> = asyncIterable[
    Symbol.asyncIterator
  ]();
  return createAsyncSequence<T>(asyncIterator);
}
