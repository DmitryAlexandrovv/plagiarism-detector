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
    .option('-f, --folders', 'send folders')
    .option('-name, --name', 'send fileName')
    .description('Compare folders to plagiarism')
    .action((path, opts) => {
        console.log(opts.folders);
        console.log(path);
        const { folders, name } = opts;
        compareFolders(folders, name);
    });

program.parse()
