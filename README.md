### Async sequency
> An extension to [sequency][1]

# npm
`$ npm install async-sequency`

[1]: https://github.com/winterbe/sequency "sequency"

## How async feature works


Async Sequences can be created by utilizing one of the following functions:

```js
import {
  asyncSequenceOf,
} from "async-sequency";

let arr = [1, 2, 1, 2, 24, 124, 123, 1223, 123, 231, 3];
(async () =>
  console.log(
    await asyncSequenceOf(...arr)
      .filter(e => e % 2 == 0)
      .toList()
  ))();
  //output [ 2, 2, 24, 124 ]
```

- convert normal Sequence to asyncSequence using toAsyncSequence

```js
import {
  sequenceOf,
} from "async-sequency";

let arr = [1, 2, 1, 2, 24, 124, 123, 1223, 123, 231, 3];
(async () =>
  console.log(
    await sequenceOf(...arr)
      .toAsyncSequence()
      .filter(e => e % 2 == 0)
      .toList()
  ))();
  //output [ 2, 2, 24, 124 ]
```
- Supports all [sequency][1] functions as well