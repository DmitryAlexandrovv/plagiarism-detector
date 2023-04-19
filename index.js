#! /usr/bin/env node

import { program } from 'commander';
import compare from './commands/compare.js';

program
    .command('compare <firstFilePath> <secondFilePath>')
    .description('Compare programs to plagiarism')
    .action(compare)

program.parse()
