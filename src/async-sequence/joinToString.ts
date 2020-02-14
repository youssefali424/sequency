import { AsyncSequence } from "./asyncSequence";

export interface JoinConfig<T> {
  value?: string;
  separator?: string;
  prefix?: string;
  postfix?: string;
  limit?: number;
  truncated?: string;
  transform?: (value: T) => string;
}

const defaults = {
  value: "",
  separator: ", ",
  prefix: "",
  postfix: "",
  limit: -1,
  truncated: "...",
  transform: undefined
};

export class JoinToString {
  /**
   * Joins all elements of the sequence into a string with the given configuration.
   *
   * @param {JoinConfig<T>} config
   * @returns {string}
   */
  async joinToString<T>(
    this: AsyncSequence<T>,
    config: JoinConfig<T> = defaults
  ): Promise<string> {
    const {
      value = defaults.value,
      separator = defaults.separator,
      prefix = defaults.prefix,
      postfix = defaults.postfix,
      limit = defaults.limit,
      truncated = defaults.truncated,
      transform = defaults.transform
    } = config;

    let result = `${value}${prefix}`;
    let count = 0;

    for await (let item of this.iterator) {
      count++;
      if (count > 1) {
        result += separator;
      }
      if (limit < 0 || count <= limit) {
        result += transform != null ? transform(item) : String(item);
      } else {
        break;
      }
    }

    if (limit >= 0 && count > limit) {
      result += truncated;
    }

    result += postfix;
    return result;
  }

  /**
   * Joins all elements of the sequence into a string with the given configuration.
   *
   * @param {JoinConfig<T>} config
   * @returns {Promise<string>}
   */
  async joinTo<T>(
    this: AsyncSequence<T>,
    config: JoinConfig<T> = defaults
  ): Promise<string> {
    return await this.joinToString(config);
  }
}
