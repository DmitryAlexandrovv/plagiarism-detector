import { findPlagiarism, checkStatus, getResult } from "../utils/index.js";
import compare from './compare.js';
import fs from "fs";
import chalk from "chalk";
import path from "path";


function compareFolders (foldersPattern, fileName) {
    const arrayOfFolders = [];
    const promises = [];

    arrayOfFolders = fs.readdirSync(path.resolve(foldersPattern)).filter(function (file) {
        console.log(file);
        return fs.statSync(path + '/' + file).isDirectory();
    });

    console.log(arrayOfFolders);

    console.log(arrayOfFolders);

    arrayOfFolders.forEach((firstFolderPath) => {
        arrayOfFolders.forEach((secondFolderPath) => {
            if (firstFolderPath !== secondFolderPath) {
                const task = compare(`${firstFolderPath}/${fileName}`, `${secondFolderPath}/${fileName}`);
                promises.push(task);
            }
        })
    });

    Promise.all(promises).then((data) => {
        fs.writeFile(process.cwd() + '/plag.json', JSON.stringify(data), () => {
            console.log(
                chalk.blue.bold('Completed')
            );
        })
    });
}

export default compareFolders;