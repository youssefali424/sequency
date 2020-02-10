import Sequence from "./Sequence";

export class Any {
  /**
   * Returns `true` if at least one element match the given `predicate`.
   *
   * @param {(T) => boolean} predicate
   * @returns {boolean}
   */
  any<T>(this: Sequence<T>, predicate?: (item: T) => boolean): boolean {
    if (predicate == null) {
      return !this.iterator.next().done;
    }
    for (
      let item = this.iterator.next();
      !item.done;
      item = this.iterator.next()
    ) {
      if (predicate(item.value)) {
        return true;
      }
    }
    return false;
  }
}
