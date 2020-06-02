/*
 license: The MIT License, Copyright (c) 2020 YUKI "Piro" Hiroshi
*/

import { run, assert } from '../index.js';
const { is, isNot, ok, ng, AssertionError } = assert;

const reporter = {
  log() {},
  error() {}
};

export async function testRunSynchronousTests() {
  const result = await run([
    {
      testSuccess() {},
      testFailure() { throw new AssertionError(); },
      testError() { throw new Error(); }
    }
  ], { reporter });
  is({ success: 1, failure: 1, error: 1 },
     result);
}

export async function testRunAsynchronousTests() {
  const result = await run([
    {
      async testSuccess() {},
      async testFailure() { throw new AssertionError(); },
      async testError() { throw new Error(); }
    }
  ], { reporter });
  is({ success: 1, failure: 1, error: 1 },
     result);
}
