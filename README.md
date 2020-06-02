# tiny-esm-test-runner

[![Build Status](https://travis-ci.org/piroor/tiny-esm-test-runner.svg?branch=master)](https://travis-ci.org/piroor/tiny-esm-test-runner)

Small test runner for ES modules style modules on Node.js.
**This is for you ES modules addict, if you hope to write tests for ES modules as ES modules strictly.**

## Benefits

A testcase written for this testing framework are completely valid ES module.
Thus you don't need to put any ugly exceptions for `eslint` about your testcases, and it will allow you to keep testcases more strict easily.

## How to create test cases

First, please create test files as module files. For example:

```javascript
// Save as "test-example.js"

import { assert } from 'tiny-esm-test-runner';
const { is, isNot, ok, ng } = assert;

// Function (both sync and async) exported with the name "setUp" is
// automatically detected as the common setup for each test.
// This is optional.
export function setUp() {
  // common setup process
}

// Function (both sync and async) exported with the name "tearDown" is
// automatically detected as the common teardown for each test.
// This is optional.
export function tearDown() {
  // common teardown process
}

// Function (both sync and async) exported with the name "shutDown" is
// automatically detected as the finalization process for all tests.
// This is optional.
export function shutDown() {
  // the finalization process
}

// All functions (both sync and async) exported with a name starting
// with the prefix "test" are automatically detected as tests.
export function testSuccess() {
  const expected = 'AAA';
  const actual = 'aaa'.toUpperCase();
  is(expected, actual);
}

export function testFail() {
  const expected = 'AAA';
  const actual = 'aaa'.toLowerCase();
  is(expected, actual);
}
```

After that run the `run-tiny-esm-test-runner` command with created testcase files, like:

```bash
$ run-tiny-esm-test-runner test-*.js
```

The command returns `0` if all tests succeeded. Otherwise `1` will be returned and details are printed.

## For your modules

If you develop a npm module, you'll put the test script like:

```json
{
  "scripts": {
    ...
    "test": "run-tiny-esm-test-runner test/test-*.js"
  },
  "devDependencies": {
    ...
    "tiny-esm-test-runner": "^1.1.0"
  }
}
```

After that, you just run `npm install && npm test` to do tests.

## Available assertions

### `is(expected, actual, message)`

This assertion accepts two or three arguments:

* `expected` (required, any type): The expected value.
* `actual` (required, any type): The actual value.
* `message` (optional, `string`): An extra message printed when the assertion failed.

This succeeds when the actual value equals to the given expected value, based on the `===` operator.
Even if they are not exact same, they are re-compared again as JSON strings if they are JSON-stringifiable objects (`Object`, `Array`, and so on).


### `isNot(expected, actual, message)`

This assertion accepts two or three arguments:

* `expected` (required, any type): The expected value.
* `actual` (required, any type): The actual value.
* `message` (optional, `string`): An extra message printed when the assertion failed.

This is opposite of `is()`, succeeds when the actual value does not equal to the given expected value, based on the `!==` operator.
They are also re-compared again as JSON strings if they are JSON-stringifiable objects (`Object`, `Array`, and so on).

### `ok(actual, message)`

This assertion accepts one or two arguments:

* `actual` (required, any type): The actual value.
* `message` (optional, `string`): An extra message printed when the assertion failed.

This succeeds when the actual value is detected as `true` on JavaScript.

### `ng(actual, message)`

This assertion accepts one or two arguments:

* `actual` (required, any type): The actual value.
* `message` (optional, `string`): An extra message printed when the assertion failed.

This is opposite of `ok()`, succeeds when the actual value is detected as `false` on JavaScript.

## Data driven tests

If you set a `parameters` property to a test function, it will become a data-driven test. For example:

```javascript
testSuccess.parameters = [
  ['AAA', 'aaa'],
  ['BBB', 'bbb']
];
export function testUpperCase([expected, data]) {
  is(expected, data.toUppwerCase());
}
```

or

```javascript
testSuccess.parameters = {
  a: ['AAA', 'aaa'],
  b: ['BBB', 'bbb']
};
export function testUpperCase([expected, data]) {
  is(expected, data.toUppwerCase());
}
```

The `parameters` property must be an `Array` or an `Object`.
If you specify an `Array`, the test function will be called multiple times for each element.
If you specify an `Object`, the test function will be called multiple times with values for each key.

Given parameters are available on `setUp()` and `tearDown()` also.

## For debugging

If you set `runnable` property to test functions with any `true` compatible value, only such flagged tests are executed and other tests are skipped.
This will help you to run only some failed tests again and again on debugging.
For example:

```javascript
// This test is skipped.
export function testSuccess() {
  const expected = 'AAA';
  const actual = 'aaa'.toUpperCase();
  is(expected, actual);
}

// This test is executed.
testFail.runnable = true;
export function testFail() {
  const expected = 'AAA';
  const actual = 'aaa'.toLowerCase();
  is(expected, actual);
}
```

# Example usecases

* [self test](./tests/)
* https://github.com/piroor/webextensions-lib-dom-updater/tree/master/test
* https://github.com/piroor/copy-selected-tabs-to-clipboard/tree/master/test
* https://github.com/piroor/xulmigemo/tree/master/webextensions/test

# License

MIT
