#! /usr/bin/env node

import { program } from 'commander';
import compare from './commands/compare.js';
import compareFolders from './commands/compareFolders.js';
import { findPlagiarism, checkStatus, getResult } from './utils/index.js';

program
    .command('compare')
        .option('-fp, --firstFilePath <firstFilePath>', 'firstFilePath')
        .option('-sp, --secondFilePath <secondFilePath>', 'secondFilePath')
        .description('Compare programs to plagiarism')
        .action(function (options) {
            const { firstFilePath, secondFilePath } = options;
            compare(firstFilePath, secondFilePath);
        })

program
    .command('compare-folders')
        .option('-fp, --foldersPattern <foldersPattern>', 'send foldersPattern')
        .option('-n, --fileName <fileName>', 'send fileName')
        .description('Compare folders to plagiarism')
        .action(function (options) {
            const { foldersPattern, fileName } = options;
            compareFolders(foldersPattern, fileName);
        });

program.parse()

export { 
    findPlagiarism,
    checkStatus,
    getResult,
}
