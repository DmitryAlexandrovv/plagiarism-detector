#! /usr/bin/env node

import { program } from 'commander';
import compare from './commands/compare.js';
import compareFolders from './commands/compareFolders.js';

program
    .command('compare <firstFilePath> <secondFilePath>')
    .description('Compare programs to plagiarism')
    .action(compare)

program
    .command('compare-folders')
    .option('-f, --folders <folders>', 'send folders')
    .option('-n, --name <name>', 'send fileName')
    .description('Compare folders to plagiarism')
    .action(function () {
        const { folders, name } = this.opts();
        compareFolders(folders, name);
    });

program.parse()
