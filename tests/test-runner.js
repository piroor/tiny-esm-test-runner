/*
 license: The MIT License, Copyright (c) 2020 YUKI "Piro" Hiroshi
*/

import { run, assert } from '../index.js';
const { is, isNot, ok, ng } = assert;

export async function testRunSynchronousTests() {
  const result = await run([
    {
      test1() {},
      test2() {},
      test3() {}
    }
  ]);
  is({ success: 3, failure: 0, error: 0 },
     result);
}
