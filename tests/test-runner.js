/*
 license: The MIT License, Copyright (c) 2020 YUKI "Piro" Hiroshi
*/

import { run, assert } from '../index.js';
const { is, AssertionError } = assert;

const reporter = {
  log() {},
  error() {}
};

export async function testRunTests() {
  const log = [];
  const result = await run([
    {
      setUp() { log.push('sync setup'); },
      tearDown() { log.push('sync teardown'); },
      shutDown() { log.push('sync shutdown'); },
      testSuccess() { log.push('sync success'); },
      testFailure() { log.push('sync failure'); throw new AssertionError(); },
      testError() { log.push('sync error'); throw new Error(); }
    },
    {
      async setUp() { log.push('async setup'); },
      async tearDown() { log.push('async teardown'); },
      async shutDown() { log.push('async shutdown'); },
      async testSuccess() { log.push('async success'); },
      async testFailure() { log.push('async failure'); throw new AssertionError(); },
      async testError() { log.push('async error'); throw new Error(); }
    }
  ], { reporter });
  is([
    'sync setup', 'sync success', 'sync teardown',
    'sync setup', 'sync failure', 'sync teardown',
    'sync setup', 'sync error', 'sync teardown',
    'sync shutdown',
    'async setup', 'async success', 'async teardown',
    'async setup', 'async failure', 'async teardown',
    'async setup', 'async error', 'async teardown',
    'async shutdown'
  ], log);
  is({ success: 2, failure: 2, error: 2 },
     result);
}

export async function testRunOnlyRunnable() {
  const log = [];
  const testcases = [
    {
      setUp() { log.push('setup1'); },
      tearDown() { log.push('teardown1'); },
      shutDown() { log.push('shutdown1'); },
      testRunnable() { log.push('runnable1'); },
      testUnrunnable1() { log.push('unrunnable1-1'); },
      testUnrunnable2() { log.push('unrunnable1-2'); }
    },
    {
      setUp() { log.push('setup2'); },
      tearDown() { log.push('teardown2'); },
      shutDown() { log.push('shutdown2'); },
      testUnrunnable1() { log.push('unrunnable2-1'); },
      testUnrunnable2() { log.push('unrunnable2-2'); }
    }
  ];
  testcases[0].testRunnable.runnable = true;
  const result = await run(testcases, { reporter });
  is([
    'setup1', 'runnable1', 'teardown1',
    'shutdown1'
  ], log);
  is({ success: 1, failure: 0, error: 0 },
     result);
}

export async function testDataDrivenTests() {
  const log = [];
  const testcases = [
    {
      setUp(data) { log.push(`setup ${JSON.stringify(data)}`); },
      tearDown(data) { log.push(`teardown ${JSON.stringify(data)}`); },
      testWithArrayData(data) { log.push(`test array ${JSON.stringify(data)}`); },
      testWithObjectData(data) { log.push(`test object ${JSON.stringify(data)}`); }
    }
  ];
  testcases[0].testWithArrayData.parameters = [
    0,
    ['string'],
    { foo: true }
  ];
  testcases[0].testWithObjectData.parameters = {
    primitive: 0,
    array:     ['string'],
    object:    { foo: true }
  };
  const result = await run(testcases, { reporter });
  is([
    'setup 0', 'test array 0', 'teardown 0',
    'setup ["string"]', 'test array ["string"]', 'teardown ["string"]',
    'setup {"foo":true}', 'test array {"foo":true}', 'teardown {"foo":true}',
    'setup 0', 'test object 0', 'teardown 0',
    'setup ["string"]', 'test object ["string"]', 'teardown ["string"]',
    'setup {"foo":true}', 'test object {"foo":true}', 'teardown {"foo":true}'
  ], log);
  is({ success: 6, failure: 0, error: 0 },
     result);
}
