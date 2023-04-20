import { findPlagiarism, checkStatus, getResult } from "../utils/index.js";
import compare from './compare.js';
import fs from "fs";
import chalk from "chalk";


function compareFolders (folders, fileName) {
    const arrayOfFolders = folders.split(';');
    console.log(arrayOfFolders)
    const promises = [];

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