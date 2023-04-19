#! /usr/bin/env node

import { program } from 'commander';
import compare from './commands/compare.js';
import compareFolders from './commands/compareFolders.js';

program
    .command('compare <firstFilePath> <secondFilePath>')
    .description('Compare programs to plagiarism')
    .action(compare)

program
    .command('compare-folders <fodlers> <fileName>')
    .description('Compare folders to plagiarism')
    .action(compareFolders)

program.parse()
