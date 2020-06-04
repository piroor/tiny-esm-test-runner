/*
 license: The MIT License, Copyright (c) 2020 YUKI "Piro" Hiroshi
*/
'use strict';

import { AssertionError } from './assert.js';

export async function run(testCases, { reporter, stdout } = {}) {
  if (!reporter)
    reporter = console;
  let runOnlyRunnable = false;
  const count = {
    success: 0,
    failure: 0,
    error:   0
  };
  const populatedTestCases = [];
  for (const tests of testCases) {
    const populatedTestCase = {
      setUp:    tests.setUp || tests.setup,
      tearDown: tests.tearDown || tests.teardown,
      shutDown: tests.shutDown || tests.shutdown
    };
    for (const name of Object.keys(tests)) {
      if (!name.startsWith('test'))
        continue;
      if (tests[name].runnable)
        runOnlyRunnable = true;
      if (tests[name].parameters) {
        const parameters = await tests[name].parameters;
        if (Array.isArray(parameters)) {
          for (let i = 0, maxi = parameters.length; i < maxi; i++) {
            const params = parameters[i];
            const test = async () => tests[name](params);
            test.$params = params;
            test.runnable = tests[name].runnable;
            populatedTestCase[`${name} [${i}]`] = test;
          }
        }
        else {
          for (const parametersName of Object.keys(parameters)) {
            const params = parameters[parametersName];
            const test = async () => tests[name](params);
            test.$params = params;
            test.runnable = tests[name].runnable;
            populatedTestCase[`${name} [${parametersName}]`] = test;
          }
        }
      }
      else {
        populatedTestCase[name] = tests[name];
      }
    }
    populatedTestCases.push(populatedTestCase);
  }
  let lastSuccess = true;
  for (const tests of populatedTestCases) {
    const setup    = tests.setUp || tests.setup;
    const teardown = tests.tearDown || tests.teardown;
    let shouldShutDown = false;
    for (const name of Object.keys(tests)) {
      if (!name.startsWith('test'))
        continue;
      if (runOnlyRunnable && !tests[name].runnable)
        continue;
      let shouldTearDown = true;
      shouldShutDown = true;
      const test = tests[name];
      try {
        if (typeof setup == 'function') {
          if ('$params' in test)
            await setup(test.$params);
          else
            await setup();
        }
        await test();
        if (typeof teardown == 'function') {
          if ('$params' in test)
            await teardown(test.$params);
          else
            await teardown();
          shouldTearDown = false;
        }
        //reporter.log(`Success: ${name}`);
        stdout('.');
        lastSuccess = true;
        count.success++;
      }
      catch(error) {
        try {
          if (shouldTearDown &&
              typeof teardown == 'function') {
            if ('$params' in test)
              await teardown(test.$params);
            else
              await teardown();
          }
          throw error;
        }
        catch(error) {
          if (lastSuccess)
            reporter.log(''); // newline
          if (error instanceof AssertionError) {
            reportFailure(name, error, reporter);
            count.failure++;
          }
          else {
            reportError(name, error, reporter);
            count.error++;
          }
          lastSuccess = false;
        }
      }
    }
    const shutdown = tests.shutDown || tests.shutdown;
    try {
      if (shouldShutDown &&
          typeof shutdown == 'function') {
        await shutdown();
      }
    }
    catch(error) {
      if (error instanceof AssertionError) {
        reportFailure('shutdown', error, reporter);
        count.failure++;
      }
      else {
        reportError('shutdown', error, reporter);
        count.error++;
      }
      lastSuccess = false;
    }
  }
  reporter.log('Done.');
  return count;
}

function reportError(name, error, reporter) {
  reporter.log(`Error: ${name}`);
  reporter.error(error);
}

function reportFailure(name, error, reporter) {
  reporter.log(`Failure: ${name}`);
  reporter.error(error);

/*  const item = mLogs.appendChild(document.createElement('li'));
  item.classList.add('failure');
  const description = item.appendChild(document.createElement('div'));
  description.classList.add('description');
  description.textContent = name;
  if (error.message) {
    description.appendChild(document.createElement('br'));
    description.appendChild(document.createTextNode(error.message));
  }

  const stack = item.appendChild(document.createElement('pre'));
  stack.classList.add('stack');
  stack.textContent = error.stack;

  if ('expected' in error) {
    const expectedBlock = item.appendChild(document.createElement('fieldset'));
    expectedBlock.appendChild(document.createElement('legend')).textContent = 'Expected';
    const expected = expectedBlock.appendChild(document.createElement('pre'));
    expected.classList.add('expected');
    expected.textContent = error.expected.trim();
  }

  const actualBlock = item.appendChild(document.createElement('fieldset'));
  actualBlock.appendChild(document.createElement('legend')).textContent = 'Actual';
  const actual = actualBlock.appendChild(document.createElement('pre'));
  actual.classList.add('actual');
  actual.textContent = error.actual.trim();

  if ('expected' in error) {
    const diffBlock = item.appendChild(document.createElement('fieldset'));
    diffBlock.appendChild(document.createElement('legend')).textContent = 'Difference';
    const diff = diffBlock.appendChild(document.createElement('pre'));
    diff.classList.add('diff');
    const range = document.createRange();
    range.selectNodeContents(diff);
    range.collapse(false);
    diff.appendChild(range.createContextualFragment(Diff.readable(error.expected, error.actual, true)));
    range.detach();
  }
*/
}
