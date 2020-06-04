#!/usr/bin/env node
/*
 license: The MIT License, Copyright (c) 2020 YUKI "Piro" Hiroshi
*/

import { resolve } from 'path';
import { run } from '../index.js';

Promise.all(process.argv.slice(2).map(path => import(resolve(path))))
  .then(testCaseModules => run(testCaseModules, {
    stdout: (...args) => process.stdout.write(...args)
  }))
  .then(result => process.exit(result.failure + result.error > 0 ? 1 : 0));
