type Nullable<T> = T | null;

export namespace assert {
  class AssertionError extends Error {
    constructor(message: string, params?: object);
  }

  function is<T>(expected: Nullable<T>, actual:Nullable<T>, message?: string): void;
  function isNot<T>(expected: Nullable<T>, actual: Nullable<T>, message?: string): void;
  function ok<T>(actual: Nullable<T>, message?: string): void;
  function ng<T>(actual: Nullable<T>, message?: string): void;
}
