# @kmamal/intervals

[![Package](https://img.shields.io/npm/v/%2540kmamal%252Fintervals)](https://www.npmjs.com/package/@kmamal/intervals)
[![Dependencies](https://img.shields.io/librariesio/release/npm/@kmamal/intervals)](https://libraries.io/npm/@kmamal%2Fintervals)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

As in `@kmamal/interval`, intervals are **closed**: both endpoints are included, so `[ start, end ]` covers every value `x` where `start <= x <= end`.

Every function assumes its inputs are **normalized** interval sets (sorted, no overlap, no empty).
Use `normalize()` to turn an arbitrary array of intervals into this canonical form before passing it to the other functions:

```js
const { normalize } = require('@kmamal/intervals/normalize')

normalize([ [ 1, 2 ], [ 3, 4 ] ])              // [ [ 1, 2 ], [ 3, 4 ] ]  already normalized
normalize([ [ 1, 3 ], [ 2, 4 ] ])              // [ [ 1, 4 ] ]            overlapping merged
normalize([ [ 1, 2 ], [ 2, 3 ], [ 3, 4 ] ])    // [ [ 1, 4 ] ]            touching merged
normalize([ [ 3, 4 ], [ 1, 2 ] ])              // [ [ 1, 2 ], [ 3, 4 ] ]  sorted
normalize([ [ 2, 2 ] ])                        // [ [ 2, 2 ] ]            single point kept
normalize([ [ 1, -1 ] ])                       // [ ]                     empty (start > end) dropped
```
