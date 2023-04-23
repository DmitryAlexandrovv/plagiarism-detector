import { findPlagiarism, checkStatus, getResult } from "../utils/index.js";
import compare from './compare.js';
import fs from "fs";
import chalk from "chalk";
import path from "path";


function compareFolders (foldersPattern, fileName) {
    const arrayOfFolders = [];
    const promises = [];
    const startTime = new Date().getTime();

    fs.readdirSync(path.resolve(foldersPattern)).filter(function (file) {
        return fs.statSync(path.resolve(foldersPattern) + '/' + file).isDirectory();
    }).forEach((file) => {
        arrayOfFolders.push({
            path: path.resolve(foldersPattern) + '/' + file, 
            relativePath: foldersPattern + '/' + file + '/' + fileName, 
        });
    })

    const comapred = {};

    arrayOfFolders.forEach(({ path: firstFolderPath, relativePath: firstRelativePath }) => {
        arrayOfFolders.forEach(({ path: secondFolderPath, relativePath: secondRelativePath }) => {
            if (firstFolderPath !== secondFolderPath && !comapred[firstFolderPath + secondFolderPath]) {
                comapred[firstFolderPath + secondFolderPath] = true;
                const task = compare(
                    `${firstFolderPath}/${fileName}`, 
                    `${secondFolderPath}/${fileName}`,
                    firstRelativePath,
                    secondRelativePath,
                );
                promises.push(task);
            }
        })
    });

    Promise.all(promises).then((data) => {
        const result = [];
        data.forEach((item) => {
            const index = result.findIndex(({ file }) => file === item.firstRelativePath);
            if (index !== -1) {
                result[index].comparedFiles.push({
                    file: item.secondRelativePath,
                    result: item.result,
                });
            } else {
                result.push({
                    file: item.firstRelativePath,
                    comparedFiles: [
                        {
                            file: item.secondRelativePath,
                            result: item.result,
                        }
                    ]
                })
            }
        });

        fs.writeFile(process.cwd() + '/plag.json', JSON.stringify(result), () => {
            const endTime = new Date().getTime();
            console.log(
                chalk.blue.bold(`Time for all files comapre is ${(endTime - startTime) / 3600}`)
            );
            console.log(
                chalk.blue.bold('Completed')
            );
        })
    });
}

export default compareFolders;