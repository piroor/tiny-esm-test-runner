#!/usr/bin/env node
/*
 license: The MIT License, Copyright (c) 2020 YUKI "Piro" Hiroshi
*/

import { resolve } from 'path';
import { run } from '../index.js';

Promise.all(process.argv.slice(2).map(path => import(resolve(path))))
  .then(testCaseModules => run(testCaseModules))
  .then(result => process.exit(result.failureCount + result.errorCount > 0 ? 1 : 0));
