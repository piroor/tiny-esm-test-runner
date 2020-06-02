/*
 license: The MIT License, Copyright (c) 2020 YUKI "Piro" Hiroshi
*/
'use strict';

export class AssertionError extends Error {
  constructor(message, params = {}) {
    super(message);
    this.name = 'AssertionError';
    if ('expected' in params)
      this.expected = params.expected;
    if ('actual' in params)
      this.actual = params.actual;
  }
}

export function is(expected, actual, message = '') {
  if (expected === actual ||
      JSON.stringify(expected) === JSON.stringify(actual))
    return;
  throw new AssertionError(message || 'unexpected value', {
    expected: JSON.stringify(expected, null, 2),
    actual:   JSON.stringify(actual, null, 2)
  });
}

export function isNot(expectedNot, actual, message = '') {
  if (expectedNot !== actual ||
      JSON.stringify(expectedNot) !== JSON.stringify(actual))
    return;
  throw new AssertionError(message || 'unexpected same value', {
    actual: JSON.stringify(actual, null, 2)
  });
}

export function ok(actual, message = '') {
  if (!!actual)
    return;
  throw new AssertionError(essage || 'unexpected non-true value', {
    actual
  });
}

export function ng(actual, message = '') {
  if (!actual)
    return;
  throw new AssertionError(message || 'unexpected non-false value', {
    actual
  });
}
