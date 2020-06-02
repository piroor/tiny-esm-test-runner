/*
 license: The MIT License, Copyright (c) 2020 YUKI "Piro" Hiroshi
*/

import { assert } from '../index.js';
const { is, isNot, ok, ng } = assert;

function assertSuccess(task) {
  try {
    task();
    ok(true);
  }
  catch(error) {
    ng(String(error));
  }
}

function assertFail(task) {
  try {
    task();
    ng(true);
  }
  catch(error) {
    ok(true);
  }
}


const equalParameters = {
  number:     [10, 10],
  string:     ['foo', 'foo'],
  boolTrue:   [true, true],
  boolFalse:  [false, false],
  sameObject: [this, this],
  sameStructure: [
    { foo: true, bar: 10, baz: 'baz' },
    { foo: true, bar: 10, baz: 'baz' }
  ]
};

const notEqualParameters = {
  number:     [10, 100],
  string:     ['foo', 'fooo'],
  boolean:    [true, false],
  object:     [this, {}],
  sameStructure: [
    { foo: true, bar: 10, baz: 'baz' },
    { foo: false, bar: 10, baz: 'baz' }
  ]
};

const trueParameters = [
  1,
  'foo',
  true,
  {}
];

const falseParameters = [
  0,
  '',
  false,
  null,
  undefined
];

testIsSuccess.parameters = equalParameters;
export function testIsSuccess([expected, actual]) {
  assertSuccess(() => {
    is(expected, actual)
  });
}

testIsFail.parameters = notEqualParameters;
export function testIsFail([expected, actual]) {
  assertFail(() => {
    is(expected, actual)
  });
}

testIsNotSuccess.parameters = notEqualParameters;
export function testIsNotSuccess([expected, actual]) {
  assertSuccess(() => {
    isNot(expected, actual)
  });
}

testIsNotFail.parameters = equalParameters;
export function testIsNotFail([expected, actual]) {
  assertFail(() => {
    isNot(expected, actual)
  });
}

testOkSuccess.parameters = trueParameters;
export function testOkSuccess(actual) {
  assertSuccess(() => {
    ok(actual)
  });
}

testOkFail.parameters = falseParameters;
export function testOkFail(actual) {
  assertFail(() => {
    ok(actual)
  });
}

testNgSuccess.parameters = falseParameters;
export function testNgSuccess(actual) {
  assertSuccess(() => {
    ng(actual)
  });
}

testNgFail.parameters = trueParameters;
export function testNgFail(actual) {
  assertFail(() => {
    ng(actual)
  });
}

