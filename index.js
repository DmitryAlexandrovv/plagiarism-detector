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
        .option('-n, --fileName <fileName>', 'send fileName')
        .description('Compare folders to plagiarism')
        .action(function (t, options) {
            const { folders, fileName } = this.opts();
            console.log('123');
            console.log(t);
            console.log(options);
            console.log(fileName);
            compareFolders(folders, fileName);
        });

program.parse()
