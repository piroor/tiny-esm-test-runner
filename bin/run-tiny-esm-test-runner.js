#!/usr/bin/env node
/*
 license: The MIT License, Copyright (c) 2020 YUKI "Piro" Hiroshi
*/

import { resolve } from 'path';
import { default as glob } from 'glob';
import { default as fileUrl } from 'file-url';
import { run } from '../index.js';

const files = process.argv.slice(2).map(path => glob.sync(path)).flat().map(path => resolve(path));
const urls = files.map(path => fileUrl(path));
Promise.all(urls.map(url => import(url)))
  .then(testCaseModules => run(testCaseModules, {
    stdout: (...args) => process.stdout.write(...args)
  }))
  .then(result => process.exit(result.failure + result.error > 0 ? 1 : 0));
