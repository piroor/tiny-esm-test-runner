# tiny-esm-test-runner

Small test runner for ESModules style modules on Node.js.

## How to create test cases

First, please create test files as ESModules. For example:

```javascript
// Save as "test-example.js"

import { assert } from 'tiny-esm-test-runner';
const { is, isNot, ok, ng } = assert;

// Exported functions (both sync and async) starting with the term "test" are
// automatically detected as tests.
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
  "dependencies": {
    ...
    "tiny-esm-test-runner": "^1.0.0"
  }
}
```

After that, you just run `npm install && npm test` to do tests.
