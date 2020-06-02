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
  const log = [];
  const result = await run([
    {
      setUp() { log.push('setup'); },
      tearDown() { log.push('teardown'); },
      testSuccess() { log.push('success'); },
      testFailure() { log.push('failure'); throw new AssertionError(); },
      testError() { log.push('error'); throw new Error(); }
    }
  ], { reporter });
  is(['setup', 'success', 'teardown',
      'setup', 'failure', 'teardown',
      'setup', 'error', 'teardown'],
     log);
  is({ success: 1, failure: 1, error: 1 },
     result);
}

export async function testRunAsynchronousTests() {
  const log = [];
  const result = await run([
    {
      async setUp() { log.push('setup'); },
      async tearDown() { log.push('teardown'); },
      async testSuccess() { log.push('success'); },
      async testFailure() { log.push('failure'); throw new AssertionError(); },
      async testError() { log.push('error'); throw new Error(); }
    }
  ], { reporter });
  is(['setup', 'success', 'teardown',
      'setup', 'failure', 'teardown',
      'setup', 'error', 'teardown'],
     log);
  is({ success: 1, failure: 1, error: 1 },
     result);
}

export async function testRunOnlyRunnable() {
  const log = [];
  const testcase = {
    setUp() { log.push('setup'); },
    tearDown() { log.push('teardown'); },
    testRunnable() { log.push('runnable'); },
    testUnrunnable1() { log.push('unrunnable1'); },
    testUnrunnable2() { log.push('unrunnable2'); }
  };
  testcase.testRunnable.runnable = true;
  const result = await run([
    testcase
  ], { reporter });
  is(['setup', 'runnable', 'teardown'],
     log);
  is({ success: 1, failure: 0, error: 0 },
     result);
}
